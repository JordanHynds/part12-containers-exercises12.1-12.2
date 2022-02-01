import React from "react"
import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"


const Notification = () => {
    const message = useSelector(state => state.notification)

    if (message === "Wrong credentials" || message === "Bad request") {
        return (
            <Alert id="errorMessage" variant="danger">
                {message}
            </Alert>
        )
    } else if (message !== null) {
        return (
            <Alert id="successMessage" variant="success">
                {message}
            </Alert>
        )
    }

    else {
        return (<div></div>)
    }
}

export default Notification