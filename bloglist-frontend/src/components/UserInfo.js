import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleUserLogout } from "../reducers/loginReducer"
import { Button } from "react-bootstrap"

const UserInfo = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.login.username)

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.setItem("loggedBlogUser", null)
        dispatch(handleUserLogout(null))
    }
    const colorStyle = {
        color: "white"
    }

    return (
        <div >
            <div style={colorStyle}>{user} is logged in <Button size="sm" onClick={handleLogout}>Logout</Button></div>
        </div >
    )
}

export default UserInfo