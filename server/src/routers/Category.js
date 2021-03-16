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

router.get('/api/category/all', auth, async(req, res) => {
    try {
        if(!req.query.project) {
            return res.send({error: "Please provide project as query"})
        }
        const allCategories = await Category.find({
            creator: req.user._id, 
            project: req.query.project
        })
        allCategories.reverse()
        return res.send(allCategories)
    } catch (error) {
        return res.send({error: "in get all categories: " + error})
    }
})

router.patch('/api/category/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['title']
        const isValidUpdate = updates.every((item) => {
            return allowedUpdates.includes(item)
        })
        if(!isValidUpdate){
            return res.send({error: "Illegal update. You can only update category: " + [...allowedUpdates]})
        }
        const category = await Category.findOne({creator: req.user._id, _id: req.params.id})
        if(!category){
            return res.send({error: "Category not found"})
        }
        if(category.title === "Done" || category.title === 'To Check Off') {
            return res.send({error: "Sorry, you are not allowed to update this category"})
        }
        updates.forEach((update) => {
            category[update] = req.body[update]
        })
        await category.save()
        return res.send({category})
    } catch (error) {
        return res.send({error: "in update category: " + error})
    }
})

router.delete('/api/category/:id', auth, async(req, res) => {
    try {
        const category = await Category.findOne({creator: req.user._id, _id: req.params.id})
        if(!category){
            return res.status(404).send({error: "No category found"})
        }
        if(category.title === "Done" || category.title === 'To Check Off'){
            return res.send({error: "Sorry, you are not allowed to delete this category"})
        }
        category.delete()
        return res.send({category})
    } catch (error) {
        return res.send({error: "in delete category: " + error})
        
    }
})
module.exports = router