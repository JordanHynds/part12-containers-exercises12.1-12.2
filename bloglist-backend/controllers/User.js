const userRouter = require('express').Router()
const User = require('../mongo/models/user')
const bcrypt = require('bcryptjs');

userRouter.get('', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
        response.json(users)
    } catch (error) {
        next(error)
    }

})

userRouter.post('', async (request, response, next) => {
    if (request.body.password.length < 3) {
        return response.status(400).json({ error: 'password is less than 3 characters long' })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
        const user = new User({
            username: request.body.username,
            passwordHash,
            name: request.body.name
        })
        try {
            const posteduser = await user.save()
            response.status(201).json(posteduser)
        } catch (error) {
            next(error)
        }
    }
})
module.exports = userRouter