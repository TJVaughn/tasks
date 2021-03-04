const express = require('express')
const router = new express.Router();
const Task = require('../models/Task')
const auth = require('../middleware/auth')
// const checkRecaptcha = require('../middleware/recaptcha')
const Project = require('../models/Project')
// const { getCookie } = require('../middleware/getCookie')
const middleware = [auth]

//CREATE
router.post('/tasks', middleware, async (req, res) => {
    // const cookies = req.header('Cookie', 'currProjectID')
    // console.log(cookies)
    // const projectID = getCookie('currProjectID', cookies)
    // console.log(projectID)
    const project = await Project.findOne({_id: req.body.project, creator: req.user._id})

    const task = new Task({
        ...req.body,
        creator: req.user._id,
        project
    })
    
    try {
        await task.save();
        res.status(201).send(task)
    } catch (err) {
        res.status(418).send(err)
    }
})

//READ ALL TASKS
// /tasks?completed=true
// /tasks?limit=5
// /tasks?skip=0
// /tasks?sort=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    // console.log(req.user.tasks)//UNDEFINED
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === "true"
    }
    if(req.query.sort){
        const parts = req.query.sort.split(':');
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
    }
    if(!req.query.project){
        throw new Error("project id is required")
    }
    if(req.query.project){
        match.project = req.query.project
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        // console.log(req.user.tasks)//ALL TASKS BECAUSE IT HAS JUST BEEN POPULATED

        if(req.user.tasks.length > 50){
            const delNum = req.user.tasks.length - 50
            req.user.tasks.splice(0, delNum)
        }
        res.send(req.user.tasks)
        // const tasks = await Task.find({ creator: req.user._id });
        // res.send(tasks)
    } catch (err) {
        res.status(500).send(err)
    }

})

//READ SINGLE BY ID
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        // const task = await Task.findById(req.params.id);

        const task = await Task.findOne({ _id, creator: req.user._id})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    } catch (err) {
        res.status(500).send(err)
    }

})

//UPDATE TASK BY ID

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "reoccurring", "completed"];
    const isValidUpdate = updates.every((item) => {
        return allowedUpdates.includes(item)
    })

    if(!isValidUpdate) {
        return res.status(400).send({error: "Invalid update property!"})
    }

    try {
        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne({ _id: req.params.id, creator: req.user._id })

        if(!task) {
            return res.status(404).send({error: "Task not found!"})
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        
        await task.save()
        res.send(task);

    } catch (err) {
        res.status(400).send({error: "something went wrong!"})
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, creator: req.user._id});
        
        if(!task) {
            return res.status(404).send({error: "Not authenticated to do that"})
        }

        res.send(task)

    } catch (err) {

        res.status(500).send({error: "Internal Server Error"})

    }
})

module.exports = router;