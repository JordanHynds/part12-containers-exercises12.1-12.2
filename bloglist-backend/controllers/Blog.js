
const blogRouter = require('express').Router()
const Blog = require('../mongo/models/blog')
const User = require('../mongo/models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})
blogRouter.get('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogRouter.post('', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id

    })

    try {
        const postedblog = await blog.save()
        user.blogs = user.blogs.concat(postedblog._id)
        await user.save()
        const userFilledBlog = await Blog.findOne({ _id: postedblog._id }).populate('user', { username: 1, name: 1, id: 1 })
        response.status(201).json(userFilledBlog)
    } catch (error) {
        next(error)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const id = request.params.id
    const user = request.user


    try {
        const blog = await Blog.findOne({ _id: id })
        if (blog.user.toString() === user._id.toString()) {
            try {
                await Blog.deleteOne({ _id: id })
                const arrayIndex = user.blogs.indexOf(id)
                user.blogs.splice(arrayIndex, arrayIndex + 1);
                await user.save()
                response.status(204).end()
            } catch (error) {
                next(error)
            }
        } else {
            return response.status(404).json({ error: "Blogid does not correspond with user" })
        }
    } catch (error) {
        next(error)
    }
})
blogRouter.post('/:id/comments', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const id = request.params.id
    const comment = request.body.comments
    try {
        await Blog.findOneAndUpdate({ _id: id }, {
            $push: {
                comments: comment
            }
        })
        const updatedBlog = await Blog.findOne({ _id: id })
        response.status(200).json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const id = request.params.id
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }
    try {
        const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, blog, { new: true })
        response.status(200).json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogRouter