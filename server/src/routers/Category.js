const express = require('express')
const router = new express.Router()

const auth = require('../middleware/auth')

const Category = require('../models/Category')
const Project = require('../models/Project')

router.post('/api/category/new', auth, async(req, res) => {
    try {
        const category = new Category({
            title: req.body.title,
            creator: req.user._id,
            project: await Project.findOne({_id: req.body.project, creator: req.user._id})
        })
        await category.save()
        res.status(201).send({category})
    } catch (error) {
        return res.status(500).send({error: "Sorry, there is an error in /api/category/new: " + error})
    }
})  

module.exports = router