import React, { Component } from "react"
import { Menu } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Navbar extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Menu>
          <Menu.Item name="play" as={NavLink} to="/levels" />
          <Menu.Item name="create" as={NavLink} to="/create" />
          <Menu.Item name="log-in" as={NavLink} to="/login" />
        </Menu>
      </div>
    )
  }
}
