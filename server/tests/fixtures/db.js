const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/User')
const Task = require('../../src/models/Task')

const user1ID = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1ID,
    name: "John",
    email: "mike@example.com",
    password: "jumpingjohn",
    tokens: [{
        token: jwt.sign({ _id: user1ID }, process.env.JWT_SECRET)
    }]
}

const user2ID = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2ID,
    name: "Bill",
    email: "bill@example.com",
    password: "bumpingbill",
    tokens: [{
        token: jwt.sign({ _id: user2ID }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "Initial task",
    completed: false,
    creator: user1._id
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second Task",
    completed: true,
    creator: user1._id
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Third task",
    completed: false,
    creator: user1._id
}
const taskFour = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second Task",
    completed: true,
    creator: user2._id
}
const taskFive = {
    _id: new mongoose.Types.ObjectId(),
    description: "Third task",
    completed: false,
    creator: user2._id
}

const setUpDb = async () => {
    await User.deleteMany({})
    await new User(user1).save()
    await new User(user2).save()
    await Task.deleteMany({})
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
    await new Task(taskFour).save()
    await new Task(taskFive).save()
}

module.exports = {
    user1,
    user1ID,
    user2,
    user2ID,
    taskOne,
    taskTwo,
    taskThree,
    taskFour,
    taskFive,
    setUpDb
}