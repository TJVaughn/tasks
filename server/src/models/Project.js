const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    // tasks: [{
    //     task: {
    //         type: String
    //     }
    // }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

projectSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'project'
})

projectSchema.methods.toJSON = function(){
    const project = this
    const projectObject = project.toObject()
    return projectObject
}

const Project = mongoose.model('Project', projectSchema)

module.exports = Project