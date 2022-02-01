const initialNotificationstate = null
let previoustimeOutId = 0

export const changeNotification = (notification) => {
    clearTimeout(previoustimeOutId)
    return async dispatch => {

        dispatch({
            type: "SetNotification",
            data: notification
        })
        await new Promise(resolve => { previoustimeOutId = setTimeout(resolve, 5000) })
        dispatch({
            type: "SetNotification",
            data: null
        })
    }
}
const notificationReducer = (state = initialNotificationstate, action) => {
    switch (action.type) {
        case "SetNotification": {
            return action.data
        }
        default: {
            return state
        }
    }
}

export default notificationReducer

