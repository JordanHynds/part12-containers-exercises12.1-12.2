import loginService from "../services/login"
import blogService from "../services/blogs"
import { changeNotification } from "./notificationReducer"

export const handleCurrentUser = (user) => {
    return dispatch => {
        if (user) {
            blogService.setToken(user.token)
            dispatch({
                type: "LoginUser",
                data: user
            })
        }
    }
}
export const handleUserLogin = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                "loggedBlogUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch({
                type: "LoginUser",
                data: user
            })
            dispatch(changeNotification(`${username} has successfully logged in`))


        } catch (exception) {
            dispatch(changeNotification("Wrong credentials"))
        }
    }
}

export const handleUserLogout = () => {
    return dispatch => {
        dispatch({
            type: "LogoutUser",
            data: null
        })
    }
}
const loginReducer = (state = null, action) => {
    switch (action.type) {
        case "LoginUser": {
            return action.data
        }
        case "LogoutUser": {
            return null
        }
        default: {
            return state
        }
    }
}

export default loginReducer