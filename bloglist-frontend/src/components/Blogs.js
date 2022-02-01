import { useSelector } from "react-redux"
import React from "react"
import { BrowserRouter as Router, useHistory } from "react-router-dom"
import { ListGroup } from "react-bootstrap"
const ListofBlogs = ({ blogs }) => {
    let index = 0
    const history = useHistory()
    const header = {
        fontFamily: "CopperPlate",
        Color: "Grey"
    }
    const classLink = {
        cursor: "pointer",
        color: "#007bff",
        textDecoration: "none",
        backgroundColor: "transparent"
    }
    return (
        <Router>
            <h2 style={header}>Blogs</h2>
            <ListGroup>


                {blogs.map(blog => {
                    index += 1
                    return (
                        <ListGroup.Item key={index}>
                            <a style={classLink} onClick={() => history.push(`/blogs/${blog.id}`)}>
                                {blog.title}
                            </a>
                        </ListGroup.Item>)
                })
                }

            </ListGroup>
        </Router >)
}

const Blogs = () => {
    const blogs = useSelector(state => state.blog)

    blogs.sort((firstEl, secondEl) => {
        return firstEl.likes - secondEl.likes
    })

    return (
        <ListofBlogs blogs={blogs} />
    )
}
export default Blogs