import React, { useEffect } from "react"
import Notification from "./components/Notification"
import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import UserInfo from "./components/UserInfo"
import User from "./components/User"
import Blog from "./components/Blog"
import ToggleComponent from "./components/ToggleComponent"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Switch, Route, Link, /*useParams, useHistory */ } from "react-router-dom"
import { initializeBlogs } from "./reducers/blogReducer"
import { handleCurrentUser } from "./reducers/loginReducer"
import Users from "./components/Users"
import { Container, Nav, Navbar } from "react-bootstrap"

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.login)
    //const blogs = useSelector(state => state.blog)


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
        const loggeduser = JSON.parse(loggedUserJSON)
        if (loggeduser) {
            dispatch(handleCurrentUser(loggeduser))
        }
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
        const loggeduser = JSON.parse(loggedUserJSON)
        if (loggeduser !== null) {
            dispatch(initializeBlogs())
        }
    }, [user])
    const header = {
        color: "grey",
        backgroundColor: "beige",
        fontFamily: "Lucida Console",
        marginTop: "20px",
        marginBottom: "20px",
        textAlign: "center",
        fontSize: "40px"

    }


    return (

        <div className="container">
            <Notification />
            {user === null ? <LoginForm />
                : <Router>
                    <Navbar bg="dark" expand="lg">
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <Nav.Link href="#" as="span"><Link to="/">Home </Link></Nav.Link>
                                    <Nav.Link href="#" as="span"><Link to="/users">Users </Link></Nav.Link>
                                    <Nav.Link><UserInfo /></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <h2 style={header}>Blog App</h2>
                    <Switch>
                        <Route path="/blogs/:id" >
                            <Blog />
                        </Route>
                        <Route path="/users/:id">
                            <User />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/">
                            <ToggleComponent buttonLabel="create new blog">
                                <BlogForm />
                            </ToggleComponent>
                            <Blogs />
                        </Route>
                    </Switch>
                </Router>}

        </div >
    )
}


export default App