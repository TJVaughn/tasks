const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/Task')
const { user1, user1ID, user2, user2ID, setUpDb, taskOne, taskTwo, taskThree, taskFour, taskFive } = require('./fixtures/db')

beforeEach(setUpDb)

test("Should create task for user", async () => {
    const response = await request(app).post('/tasks')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send({description: "Do a bunch of jumping jacks"})
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test("Should update a single task as completed", async () => {

})

test("Should delete a task", async () => {
    
})

test("Should not be authorized to delete other user task", async () => {
    request(app).delete('/task' + taskOne._id)
    .set('Authorization', `Bearer ${user2.tokens[0].token}`)
    .send()
    .expect(401)

    const task1 = await Task.findById(taskOne._id)
    expect(task1).not.toBeNull()
})

test("Should get all tasks", async () => {
    const response = await request(app).get('/tasks')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toBe(3)
})

test("Should get a single task", async () => {
    
})