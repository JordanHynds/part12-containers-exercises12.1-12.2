import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { blogComment } from "../reducers/blogReducer"
import { Button, ListGroup, Form } from "react-bootstrap"

const Comments = () => {
    const dispatch = useDispatch()

    const [comment, setComment] = useState("")
    const blogs = useSelector(state => state.blog)
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)
    const comments = blog.comments
    let index = 0

    const postComment = async (event) => {
        event.preventDefault()
        dispatch(blogComment(comment, id))
        setComment("")

    }

    return (
        <div>

            <Form onSubmit={postComment}>
                <Form.Group className="mb-3">
                    <Form.Control
                        id='Comment'
                        type="text"
                        value={comment}
                        placeholder="Enter a Comment"
                        name="Comment"
                        onChange={({ target }) => setComment(target.value)} />
                    <Button size="sm" id="SubmitButton" type="submit">Submit</Button>
                </Form.Group>
            </Form>
            <ListGroup>
                {comments.map(element => {
                    if (!element) {
                        return null
                    } else {
                        index++
                        return <ListGroup.Item key={index}>{element}</ListGroup.Item>
                    }
                })}
            </ListGroup>
        </div >)
}

export default Comments