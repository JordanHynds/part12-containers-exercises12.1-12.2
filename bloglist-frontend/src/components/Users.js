import { useSelector } from "react-redux"
import { BrowserRouter as Router, useHistory } from "react-router-dom"
import React from "react"


const ListofUsers = ({ listofusers }) => {
    let index = 0
    const history = useHistory()
    const classLink = {
        cursor: "pointer",
        color: "#007bff",
        textDecoration: "none",
        backgroundColor: "transparent"
    }
    return (
        <Router>

            {
                Object.entries(listofusers).map(([key, value]) => {
                    index += 1
                    return (<div style={classLink} key={index} onClick={() => history.push(`/users/${value.id}`)}>
                        {key} {value.blogs}
                    </div>)
                })
            }
        </Router>)
}
const Users = () => {
    const users = useSelector(state => state.blog)
    const listofusers = {}
    users.forEach(element => {
        if (element.user.name in listofusers) {
            listofusers[element.user.name].blogs += 1
        } else {
            listofusers[element.user.name] = { id: element.user.id, blogs: 1 }
        }

    })
    const header = {
        fontFamily: "CopperPlate",
    }

    return (
        <div>
            <h2 style={header}>Users</h2>
            <div><strong>blogs created</strong></div>
            <ListofUsers listofusers={listofusers} />
        </div >
    )
}

export default Users