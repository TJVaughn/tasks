const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    reoccurring: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true
})



const Task = mongoose.model('Task', taskSchema)

module.exports = Task;

// const laundry = new Task({
//     title: "Do laundry",
//     description: "       Wash, dry, wash, hang    ",
//     reoccurring: true,
// })

// laundry.save().then(() => {
//     console.log(laundry)
// }).catch(err => console.log(err))
