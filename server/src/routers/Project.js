const express = require('express')
const router = new express.Router()
const Project = require('../models/Project')
const auth = require('../middleware/auth')
const Task = require('../models/Task')

//CREATE
router.post('/projects', auth, async (req, res) => {
    const project = new Project({
        ...req.body,
        creator: req.user._id
    })
    try {
        await project.save()
        res.status(201).send(project)
    } catch (error) {
        res.status(400).send(error)
    }
})
//READ ALL
router.get('/projects', auth, async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user._id })
        res.send(projects)
    } catch (error) {
        res.status(500).send(error)
    }
})
//READ SINGLE
router.get('/projects/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const project = await Project.findOne({_id, creator: req.user._id})
        if(!project){
            res.status(404).send()
        }
        res.send(project)
    } catch (error) {
        res.status(500).send(error)
    }
})
//UPDATE
router.patch('/projects/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const project = await Project.findOne({ _id, creator: req.user._id})
        if(!project){
            return res.status(404).send()
        }
        const updates = Object.keys(req.body);
        const allowedUpdates = ["title"]
        const isValidUpdate = updates.every((item) => {
            return allowedUpdates.includes(item)
        })
        if(!isValidUpdate){
            return res.status(400).send({error: "Invalid update property"})
        }

        updates.forEach((update) => {
            project[update] = req.body[update]
        })
        await project.save()
        res.send(project)
        
    } catch (error) {
        res.status(500).send(error)
    }
})
//DELETE
router.delete('/projects/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const project = await Project.findOneAndDelete({creator: req.user._id, _id})
        if(!project){
            res.status(404).send()
        }
        const assocTasks = await Task.deleteMany({creator: req.user._id, project: _id})

        res.send({project, assocTasks})
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router