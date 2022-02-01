const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token;



const testblog1 =
{
    title: "test-title1",
    author: "test-author1",
    url: "test-url1",
    likes: 40
}
const testblog2 =
{
    title: "test-title2",
    author: "test-author2",
    url: "test-url2",
    likes: 5023
}

beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send({
        "username": "tester",
        "password": "tester",
        "name": "Peter",
        "blogs": []
    })

    const response = await api.post('/api/login').send({ username: "tester", password: "tester" })
    token = response.body.token;
    const user = await User.findById(token.id)
    await Blog.deleteMany({})
    await api.post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(testblog1)

    await api.post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(testblog2)
}, 10000)

test('getting notes from server', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const author = response.body.map(r => r.author)
    expect(response.body).toHaveLength(2)
    expect(author).toContainEqual("test-author1")

})
test('invalid token', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', 'bearer ' + "Wefwefwef")
        .expect(401)
        .expect('Content-Type', /application\/json/)
})

test('verify ui property', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const testblog = response.body[1]
    expect(testblog.id).toBeDefined()
})
describe('posting new notes to server', () => {
    test('posting complete note to server', async () => {
        const newBlog =
        {
            title: "test-title3",
            author: "test-author3",
            url: "test-url3",
            likes: 10
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const author = response.body.author
        expect(author).toEqual("test-author3")
    })

    test('verify missing likes property', async () => {
        const newBlog =
        {
            title: "test-title3",
            author: "test-author3",
            url: "test-url3",
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const likes = response.body.likes
        expect(likes).toEqual(0)
    })

    test('verify missing title property, fails with status code 400', async () => {
        const newBlog =
        {
            author: "test-author3",
            url: "test-url3",
            likes: 40
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(400)


    })

    test('verify missing url property, fails with status code 400', async () => {
        const newBlog =
        {
            title: "test-title3",
            author: "test-author3",
            likes: 40
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(400)
    })

    test('verify invalid token', async () => {
        const newBlog =
        {
            title: "test-title3",
            author: "test-author3",
            url: "test-url3",
            likes: 10
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + "2345345")
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)


    })
})
describe('delete blog', () => {
    test('blog is succesfully deleted', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const id = response.body[0].id
        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', 'bearer ' + token)
            .expect(204)
    })

    test('blog does not exist, fails with status code 404', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const id = response.body[0].id
        await api
            .delete(`/api/blogs/${id}+3`)
            .set('Authorization', 'bearer ' + token)
            .expect(404)
    })
})
describe('update blog', () => {
    test('blog is succesfully updated', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const id = response.body[0].id

        const blog = {
            title: "updated title",
            author: "update author",
            url: "updated url",
            likes: 20
        }
        const updatedblog = await api
            .put(`/api/blogs/${id}`)
            .set('Authorization', 'bearer ' + token)
            .send(blog)
            .expect(200)
        expect(updatedblog.body.author).toEqual(blog.author)
    })

    test('blog does not exist, fails with status code 404', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const id = response.body[0].id

        const blog = {
            title: "updated title",
            author: "update author",
            url: "updated url",
            likes: 20
        }
        const updatedblog = await api
            .put(`/api/blogs/${id}+5`)
            .set('Authorization', 'bearer ' + token)
            .send(blog)
            .expect(404)
    })
})
afterAll(() => {
    mongoose.connection.close()
})