import React, { useState } from "react"
import { Button } from "react-bootstrap"
import PropTypes from "prop-types"





// eslint-disable-next-line no-unused-vars
const ToggleComponent = React.forwardRef((props, ref) => {
    const [newBlogVisible, setNewBlogVisible] = useState(false)

    const hideWhenVisible = { display: newBlogVisible ? "none" : "" }
    const showWhenVisible = { display: newBlogVisible ? "" : "none" }
    return (
        <div>
            <div style={hideWhenVisible}>
                <Button size="sm" id="CreateNewBlog" onClick={() => setNewBlogVisible(true)}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button size="sm" variant="secondary" onClick={() => setNewBlogVisible(false)}>cancel</Button>
            </div>
        </div>
    )
})
ToggleComponent.displayName = "ToggleComponent"
ToggleComponent.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
export default ToggleComponent