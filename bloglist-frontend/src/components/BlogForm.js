import React, { useState } from "react"
import { changeNotification } from "../reducers/notificationReducer"
import { addNewBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import { Form, Button } from "react-bootstrap"


const BlogInputForm = ({
    addBlog,
    newBlogTitle,
    setNewBlogTitle,
    newBlogAuthor,
    setNewBlogAuthor,
    newBlogUrl,
    setNewBlogUrl }) => {

    const header = {
        fontFamily: "CopperPlate",
        Color: "Grey"
    }
    return (
        <Form onSubmit={addBlog}>
            <h2 style={header}>create new </h2>
            <Form.Group className="mb-3">
                <Form.Label> Title:</Form.Label>
                <Form.Control
                    id='Title'
                    type="text"
                    value={newBlogTitle}
                    placeholder="Enter Blog Title"
                    name="Title"
                    onChange={({ target }) => setNewBlogTitle(target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Author:</Form.Label>
                <Form.Control
                    id='Author'
                    type="text"
                    value={newBlogAuthor}
                    placeholder="Enter Blog's Author"
                    name="Author"
                    onChange={({ target }) => setNewBlogAuthor(target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Url:</Form.Label>
                <Form.Control
                    id='Url'
                    type="text"
                    value={newBlogUrl}
                    placeholder="Enter Blog's Url"
                    name="Url"
                    onChange={({ target }) => setNewBlogUrl(target.value)}
                />
            </Form.Group >
            <Button id="SubmitButton" type="submit">Submit</Button>
        </Form >
    )
}

const BlogForm = () => {
    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogUrl, setNewBlogUrl] = useState("")

    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        }
        dispatch(addNewBlog(newBlog), changeNotification(newBlog))



        setNewBlogTitle("")
        setNewBlogAuthor("")
        setNewBlogUrl("")
    }

    return (
        <BlogInputForm
            addBlog={addBlog}
            newBlogTitle={newBlogTitle}
            setNewBlogTitle={setNewBlogTitle}
            newBlogAuthor={newBlogAuthor}
            setNewBlogAuthor={setNewBlogAuthor}
            newBlogUrl={newBlogUrl}
            setNewBlogUrl={setNewBlogUrl}
        />
    )
}


export default BlogForm