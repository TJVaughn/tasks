const express = require('express')
const router = new express.Router();
const Task = require('../models/Task')
const auth = require('../middleware/auth')
// const checkRecaptcha = require('../middleware/recaptcha')
const Project = require('../models/Project')
const Category = require('../models/Category')
// const { getCookie } = require('../middleware/getCookie')
const middleware = [auth]

// const createStarterCategories = (project, creator) => {
//     const doneCategory = new Category({
//         title: 'Done',
//         project,
//         creator
//       })
//       const todoCategory = new Category({
//         title: 'To Check Off',
//         project,
//         creator
//       })

//       return [doneCategory, todoCategory]

// }

//CREATE
router.post('/tasks', middleware, async (req, res) => {
    // const cookies = req.header('Cookie', 'currProjectID')
    // console.log(cookies)
    // const projectID = getCookie('currProjectID', cookies)
    // console.log(projectID)
    console.log(!req.body.category ? 'yes, it is false' : 'no its true')

    try {
        let taskCategory
        if(!req.body.category){
            taskCategory = await Category.findOne({creator: req.user._id, title: 'To Check Off', project: req.body.project})
        } else {
            taskCategory = await Category.findOne({_id: req.body.category, creator: req.user._id})
        }
        const project = await Project.findOne({_id: req.body.project, creator: req.user._id})
        // const category = await Category.findOne({_id: req.body.category, creator: req.user._id})
        // const projectCategories = await Category.find({project: project._id, user: req.body._id})

        // if(!category){
        //     if(projectCategories.length === 0){
        //         let [doneCategory, todoCategory] = createStarterCategories(project._id, req.user._id)
        //         await doneCategory.save()
        //         await todoCategory.save()
        //     }
        // }
        // console.log(category)
        // taskCategory = category
        let isCompleted = false
        if(taskCategory.title === 'Done'){
            isCompleted = true
        }
        const task = new Task({
            ...req.body,
            creator: req.user._id,
            project,
            category: taskCategory,
            completed: isCompleted
        })

    
        await task.save();
        res.status(201).send(task)
    } catch (err) {
        res.send({error: "Error in create task: " + err})
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
        console.log(parts)
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
    }
    if(!req.query.project){
        throw new Error("project id is required")
    }
    if(req.query.project){
        match.project = req.query.project
    }

    try {
      let categories = await Category.find({creator: req.user._id, project: req.query.project})
      if(categories.length === 0 ) {
        const doneCategory = new Category({
          title: 'Done',
          project: req.query.project,
          creator: req.user._id
        })
        const todoCategory = new Category({
          title: 'To Check Off',
          project: req.query.project,
          creator: req.user._id
        })
        await doneCategory.save()
        await todoCategory.save()
        categories.push(todoCategory, doneCategory)
        return res.send([{category: todoCategory, tasks: []}, {category: doneCategory, tasks: []}])
      }
    //   console.log(req.query.project)
    //   categories.tasks = []
    let doneCategory = await Category.find({creator: req.user._id, project: req.query.project, title: 'Done'})
    // console.log(doneCategory)
    categories.reverse()
      let allTasks = await Task.find({creator: req.user._id, project: req.query.project})
      let sendData = []
      categories.forEach((c) => {
          sendData.push({category: c, tasks: []})
      })
      for(let t = 0; t < allTasks.length; t++) {
          if(allTasks[t].completed){
              allTasks[t].category = doneCategory[0]._id
          }
        for(let c = 0; c < categories.length; c++) {
            // console.log(allTasks[t])
            // console.log(categories[c])
            if(allTasks[t].category.toString() === categories[c]._id.toString()){
                
                sendData[c].tasks.unshift(allTasks[t])
            }
        }
      }
    //   console.log(allTasks)
    //   for(let i = 0; i < categories.length; i++){
    //       categories.tasks.push(await Task.find({
    //           creator: req.user._id,
    //           project: req.query.project,
    //           category: categories[i]._id
    //       }))
        //   for(let x = 0; x < allTasks.length; x ++){
        //     if(allTasks[x].category === categories[i]._id){
        //         categories.tasks.push(allTasks[x])
        //     }
        //   }
    //   }
    //   console.log(categories)
      res.send(sendData)

        // await req.user.populate({
        //     path: 'tasks',
        //     match,
        //     options: {
        //         limit: parseInt(req.query.limit),
        //         skip: parseInt(req.query.skip),
        //         sort
        //     }
        // }).execPopulate()
        // console.log(req.user.tasks)//ALL TASKS BECAUSE IT HAS JUST BEEN POPULATED

        // if(req.user.tasks.length > 50){
        //     const delNum = req.user.tasks.length - 50
        //     req.user.tasks.splice(0, delNum)
        // }
        // let sendData = []

        // for(let i = 0; i < req.user.tasks.length; i++){
        //     for(let x  = 0; x < categories.length; x++){
        //         if(req.user.tasks.category === categories[x]._id){

        //         }
        //     }
        // }
        // res.send(req.user.tasks)
        // const tasks = await Task.find({ creator: req.user._id });
        // res.send(tasks)
    } catch (err) {
        res.send({error: "Error in get all tasks: " + err})
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
        const categories = await Category.find({ creator: req.user._id })
        if(!task) {
            return res.status(404).send({error: "Task not found!"})
        }
        console.log(task.category)
        // console.log(categories)
        if(!task.category) {
          if(categories.length < 1){
            const todoCategory = new Category({
              title: 'To Check Off',
              project: task.project,
              creator: req.user._id
            })
            await todoCategory.save()
            task.category = todoCategory._id
          } else {
              task.category = categories[0]._id
          }
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        res.send(task);

    } catch (err) {
        res.send({error: "something went wrong!: " + err})
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
