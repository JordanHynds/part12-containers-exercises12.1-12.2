import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { handleUserLogin } from "../reducers/loginReducer"
import { Form, Button } from "react-bootstrap"
const loginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(handleUserLogin(username, password))
    }
    const header = {
        color: "Blue",
        fontFamily: "Monaco",
        margin: "10px"
    }

    return (
        <Form onSubmit={handleLogin}>
            <h2 style={header} id="loginTitle">Login to Application</h2>
            <Form.Group className="mb-3">
                <Form.Label> Username </Form.Label>
                <Form.Control
                    id="usernameInput"
                    type="text"
                    value={username}
                    placeholder="Enter Username"
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    id="passwordInput"
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" id="loginSubmit">Login</Button>
        </Form>
    )
}

export default loginForm