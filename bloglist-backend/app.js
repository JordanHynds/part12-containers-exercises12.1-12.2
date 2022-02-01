
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/Blog')
const userRouter = require('./controllers/User')
const loginRouter = require('./controllers/Login')
const middleware = require('./utils/middleware')

console.log(config.mongoUri)
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/Testing')
    app.use('/api/testing', testingRouter)
}
app.use(middleware.errorHandler)

module.exports = app