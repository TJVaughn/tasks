const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/User')
const { user1, user1ID, setUpDb } = require('./fixtures/db')

beforeEach(setUpDb)

test('User signup', async () => {
    const response = await request(app).post('/users').send({
        name: 'Trevor',
        email: "Vaughnwebdev@gmail.com",
        password: "copycatjumpjack"
    }).expect(201)

    const user = await User.findById(response.body.user._id)

    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Trevor',
            email: "vaughnwebdev@gmail.com"
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('copycatjumpjack')
})

test('User login', async () => {
    const response = await request(app).post('/users/login')
    .send({email: user1.email, password: user1.password})
    .expect(200)

    const user = await User.findById(user1ID)
    expect(user).not.toBeNull()

    expect(response.body.token).toBe(user.tokens[1].token)

})

test('User login failure', async () => {
    await request(app).post('/users/login')
    .send({email: user1.email, password: "thisreallydoesntmatter"})
    .expect(400)
})

test("Get user profile", async () => {
    await request(app).get('/users/me')
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Attempt to get user profile unauthorized', async () => {
    await request(app).get('/users/me')
    .send()
    .expect(401)
})

test("Delete account for user", async () => {
    await request(app).delete('/users/me')
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(user1ID)
    expect(user).toBeNull()
})

test("Unauthenticated attempt to delete user", async () => {
    await request(app).delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app).post('/users/me/avatar')
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/meinSF.jpg')
    .expect(200)

    const user = await User.findById(user1ID)

    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("should update user profile", async () => {
    await request(app).patch('/users/me')
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send({name: "Mike"})
    .expect(200)

    const user = await User.findById(user1ID)
    expect(user.name).toBe("Mike")
})

test("Should not allow invalid user update fields", async () => {
    await request(app).patch('/users/me')
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send({location: 'Japan'})
    .expect(400)
})