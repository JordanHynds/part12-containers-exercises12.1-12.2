const countBy = require('lodash.countby');
const reduce = require('lodash.reduce');
const groupBy = require('lodash.groupby')
const forEach = require('lodash.foreach')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (acc, cur) => acc + cur.likes;
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (acc, cur) => (acc.likes >= cur.likes) ? acc : cur
    return blogs.reduce(reducer, {})
}


const mostBlogs = (blogs) => {
    const countedblogs = countBy(blogs, 'author')
    const sortedblogs = reduce(countedblogs, (acc, cur, key) => {
        return (Object.values(acc)[0] >= cur) ? result : { author: key, blogs: cur }
    }, {});
    return sortedblogs
}

const mostLikes = (blogs) => {
    const groupedblogs = groupBy(blogs, 'author')
    const countedlikes = []
    forEach(groupedblogs, (value, key) => {
        countedlikes.push({
            author: key, likes: reduce(value, (acc, cur, key) => {
                return (acc + cur.likes)
            }, 0)
        })
    })
    const mostlikes = reduce(countedlikes, (acc, cur, key) => {
        return (acc.likes >= cur.likes) ? acc : cur
    }, {})
    return mostlikes
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

