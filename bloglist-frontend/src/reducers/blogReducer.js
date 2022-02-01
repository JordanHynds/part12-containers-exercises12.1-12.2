import blogService from "../services/blogs"
import { changeNotification } from "./notificationReducer"

export const increaseBlogLikes = (changedBlog) => {
    return async dispatch => {
        try {
            dispatch({
                type: "IncreaseVote",
                data: changedBlog
            })
            dispatch(changeNotification(`${changedBlog.title} has been liked`))
            await blogService.changeblog(changedBlog)
        } catch (exception) {
            dispatch(changeNotification("Bad request"))

        }
    }
}
export const addNewBlog = (newBlog) => {
    return async dispatch => {
        try {
            const addedBlog = await blogService.postBlog(newBlog)
            console.log(addedBlog)
            dispatch({
                type: "AddedBlog",
                data: addedBlog
            })
            dispatch(changeNotification(`${newBlog.title} by ${newBlog.author} has successfully been added`))
        } catch (exception) {
            dispatch(changeNotification("Bad request"))
        }
    }
}

export const removeBlog = (blogToBeDeleted) => {
    return async dispatch => {
        if (window.confirm("Do you really want to delete this blog?")) {
            try {
                dispatch(changeNotification(`${blogToBeDeleted.title} has been deleted`))
                dispatch({
                    type: "DeleteBlog",
                    data: blogToBeDeleted
                })
                await blogService.deleteblog(blogToBeDeleted)
            } catch (exception) {
                console.log(exception)
                dispatch(changeNotification("Bad request"))
            }
        }
    }
}
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: "InitBlogs",
            data: blogs,
        })
    }
}
export const blogComment = (comment, id) => {
    return async dispatch => {
        dispatch({
            type: "CommentBlog",
            data: { comment, id }
        })
        dispatch(changeNotification(`${comment} has been added`))
        await blogService.commentblog(comment, id)
    }
}
export const getBlogsFromId = (id) => {
    return async dispatch => {
        const blogs = await blogService.getBlogsFromId(id)
        dispatch({
            type: "GetBlogsFromId",
            data: blogs,
        })
    }
}
const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "IncreaseVote": {
            const id = action.data.id
            const blogToChange = state.find(n => n.id === id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes += 1
            }
            const copyState = [...state]
            copyState.map(blog =>
                blog.id !== id ? blog : changedBlog
            )
            console.log(copyState)
            return copyState
        }
        case "DeleteBlog": {
            const index = state.indexOf(action.data)
            const copyState = [...state]
            copyState.splice(index, index + 1)
            return copyState
        }
        case "AddedBlog": {
            console.log([...state, action.data])
            return [...state, action.data]
        }
        case "InitBlogs": {
            return action.data
        }
        case "GetBlogsFromId": {
            return action.data
        }
        case "CommentBlog": {
            const id = action.data.id
            const blogToChange = state.find(n => n.id === id)
            const changedBlog = {
                ...blogToChange,
                comments: blogToChange.comments.push(action.data.comment)
            }
            const copyState = [...state]
            copyState.map(blog =>
                blog.id !== id ? blog : changedBlog
            )
            return copyState
        }
        default: {
            return state
        }
    }
}

export default blogReducer