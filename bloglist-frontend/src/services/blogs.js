import axios from "axios"
const baseUrl = process.env.REACT_APP_BACKEND_URL + "/blogs"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios
        .get(baseUrl, { headers: { Authorization: token } })
    return request.data

}
const getBlogsFromId = async (id) => {
    const request = await axios
        .get(`${baseUrl}/${id}`, { headers: { Authorization: token } })
    return request.data
}

const postBlog = async (newBlog) => {
    const request = await axios
        .post(baseUrl, newBlog, { headers: { Authorization: token } })
    return request.data
}

const commentblog = async (comment, id) => {
    console.log(comment)
    const request = await axios
        .post(`${baseUrl}/${id}/comments`, { comments: comment }, { headers: { Authorization: token } })
    console.log(request.data)
    return request.data
}

const changeblog = async (changedblog) => {
    const blogid = changedblog.id
    const newblog = {
        user: changedblog.user.id,
        title: changedblog.title,
        author: changedblog.author,
        url: changedblog.url,
        likes: JSON.stringify(changedblog.likes + 1)

    }
    const request = await axios
        .put(`${baseUrl}/${blogid}`, newblog, { headers: { Authorization: token } })
    return request.data

}

const deleteblog = async (blogToBeDeleted) => {
    const blogid = blogToBeDeleted.id
    await axios
        .delete(`${baseUrl}/${blogid}`, { headers: { Authorization: token } })
}

export default { getAll, getBlogsFromId, setToken, postBlog, changeblog, deleteblog, commentblog }