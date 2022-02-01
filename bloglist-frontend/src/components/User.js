import { getBlogsFromId } from "../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { ListGroup } from "react-bootstrap"

const User = () => {
    const id = useParams().id
    let index = 0
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlogsFromId(id))
    }, [id])
    const blogs = useSelector(state => state.blog)
    blogs.sort((firstEl, secondEl) => {
        return firstEl.likes - secondEl.likes
    })
    const header = {
        fontFamily: "CopperPlate",
    }
    if (blogs.length === 0) {
        return null
    }

    else {
        return (
            <div>
                <h2 style={header}>{blogs[0].user.name}</h2>
                <div><strong>added blogs</strong></div>
                <ListGroup>
                    {blogs.map(blog => {
                        index += 1
                        return (<ListGroup.Item key={index}>{blog.title}</ListGroup.Item>)
                    })}
                </ListGroup>

            </div>)
    }
}

export default User