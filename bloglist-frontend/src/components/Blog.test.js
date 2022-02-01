import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import blogcomponent from "./Blog"
const Blog = blogcomponent.Blog

describe("Testing Blog", () => {
    let blogcomponent
    let mockIncreasedLikesHandler
    let mockDeletedBlgosHandler
    beforeEach(() => {
        const blog = {
            user: "testuser",
            title: "testtitle",
            author: "testauthor",
            url: "testurl",
            likes: "10"
        }
        mockIncreasedLikesHandler = jest.fn()
        mockDeletedBlgosHandler = jest.fn()
        blogcomponent = render(
            <Blog key={1} blog={blog} increaseLikes={mockIncreasedLikesHandler} deleteBlog={mockDeletedBlgosHandler} />
        )
    })
    test("renders title/author only by defualt", () => {

        expect(blogcomponent.container.querySelector(".default")).toHaveTextContent("testtitle testauthorview")
        expect(blogcomponent.container.querySelector(".default")).toHaveStyle("display: block")
        expect(blogcomponent.container.querySelector(".shown")).toHaveStyle("display: none")
    })

    test("renders url/likes when view button clicked", () => {
        const button = blogcomponent.getByText("view")
        fireEvent.click(button)

        expect(blogcomponent.container.querySelector(".default")).toHaveStyle("display: none")
        expect(blogcomponent.container.querySelector(".shown")).toHaveStyle("display: block")
    })

    test("event handler called twice when like button clicked tiwce", () => {
        const button = blogcomponent.getByText("like")
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockIncreasedLikesHandler.mock.calls).toHaveLength(2)
    })
})