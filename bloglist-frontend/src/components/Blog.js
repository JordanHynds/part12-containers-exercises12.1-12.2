import { useDispatch, useSelector } from "react-redux"
import { increaseBlogLikes, removeBlog } from "../reducers/blogReducer"
import { useParams } from "react-router-dom"
import Comments from "./Comment"
import React from "react"
import { Button } from "react-bootstrap"


const Blog = () => {
    console.log("test")
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blog)

    const id = useParams().id

    const blog = blogs.find(blog => blog.id === id)

    const increaseLikes = async (blog) => {
        dispatch(increaseBlogLikes(blog))
    }
    const deleteBlog = async (blog) => {
        dispatch(removeBlog(blog))
    }
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    const loggedBlogUser = JSON.parse(loggedUserJSON)

    const header = {
        fontFamily: "CopperPlate",
        Color: "Grey"
    }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        borderWidth: 1,
        marginBottom: 5
    }
    if (!blog || blogs.length === 0) {
        return null
    } else {
        return (
            <div>
                <div id={blog.title} style={blogStyle}>
                    <h2 style={header}>{blog.title}</h2>
                    <a href={blog.url}>{blog.url}</a>
                    <div id="like">
                        <div id="numberofLikes">likes {blog.likes}
                            <Button size="sm" variant="outline-primary" id="likeButton" onClick={() => increaseLikes(blog)}>like</Button>
                        </div>
                    </div>
                    <div>added by {blog.user.username}</div>
                    <div> {loggedBlogUser.username === blog.user.username ? <Button variant="outline-primary" size="sm" id="remove" onClick={() => deleteBlog(blog)}>remove</Button> : <div></div>}</div>
                </div>
                <h2 style={header}>Comments</h2>
                <Comments />
            </div >
        )
    }
}

export default Blog