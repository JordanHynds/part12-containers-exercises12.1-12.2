const jwt = require('jsonwebtoken')
const { response } = require('express')
const User = require('../mongo/models/user')
const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    } else if (error.name === 'CastError') {
        return response.status(404).send({ error: 'blog does not exsit' })
    } else if (error.name === 'ReferenceError') {
        return response.status(404).send({ error: 'blog does not exsit' })
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).send({ error: error.message })
    }
    next(error)
}

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}
const tokenExtractor = (request, response, next) => {
    const requesttoken = getTokenFrom(request)
    request.token = requesttoken
    next()
}

const userExtractor = async (request, response, next) => {
    const requesttoken = getTokenFrom(request)

    try {
        const decodedToken = jwt.verify(requesttoken, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        request.user = user
    } catch (error) {
        next(error)
    }
    next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }