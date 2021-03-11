const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

categorySchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'category'
})

categorySchema.methods.toJSON = function () {
    const category = this
    const categoryObject = category.toObject()
    return categoryObject
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category