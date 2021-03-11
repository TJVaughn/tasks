require('./db/mongoose')
const express = require('express');
const app = express();
const userRouter = require('./routers/User')
const taskRouter = require('./routers/Task')
const weatherRouter = require('./routers/Weather')
const projectRouter = require('./routers/Project')
const recaptchaRouter = require('./routers/Recaptcha')
const quoteRouter = require('./routers/Quote')
const categoryRouter = require('./routers/Category')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(weatherRouter)
app.use(projectRouter)
app.use(recaptchaRouter)
app.use(quoteRouter)
app.use(categoryRouter)

module.exports = app