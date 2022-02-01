import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"



test("test blogInputForm", () => {
    const handleBlogChange = jest.fn()
    const inputComponent = render(
        <BlogForm handleBlogChange={handleBlogChange} />
    )
    const titleInput = inputComponent.container.querySelector("#Title")
    const authorInput = inputComponent.container.querySelector("#Author")
    const urlInput = inputComponent.container.querySelector("#Url")
    const form = inputComponent.container.querySelector("form")

    fireEvent.change(titleInput, { target: { value: "testing title worked" } })
    fireEvent.change(authorInput, { target: { value: "testing author worked" } })
    fireEvent.change(urlInput, { target: { value: "testing url worked" } })

    fireEvent.submit(form)
    expect(handleBlogChange.mock.calls[0][0].title).toBe("testing title worked")
    expect(handleBlogChange.mock.calls[0][0].author).toBe("testing author worked")
    expect(handleBlogChange.mock.calls[0][0].url).toBe("testing url worked")

})
