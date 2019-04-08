import React, { Component } from "react"
import { Menu, Button } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Navbar extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Menu widths={4} attached="top" tabular>
          <Menu.Item name="PLAY" as={NavLink} to="/levels" />
          <Menu.Item name="CREATE" as={NavLink} to="/create" />
          {/* <Menu.Item name="discover" as={NavLink} to="/discover" /> */}

          {this.props.currentUser ? (
            <Menu.Item name="log-out" position={"right"}>
              <Button onClick={this.props.logOut}>Log Out</Button>
            </Menu.Item>
          ) : (
            <>
              <Menu.Item position={"right"}>
                <Button primary as={NavLink} to="/signup">
                  Sign Up
                </Button>
                <Button as={NavLink} to="/login">
                  Log In
                </Button>
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    )
  }
}
