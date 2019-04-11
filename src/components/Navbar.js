import React, { Component } from "react"
import { Menu, Image, Icon } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Navbar extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Menu stackable={true} id="navBar" widths={5} attached="top" tabular>
          <Menu.Item color={"green"} name="PLAY" as={NavLink} to="/levels" />
          <Menu.Item
            color={"blue"}
            icon={!this.props.currentUser ? "lock" : null}
            name="CREATE"
            as={NavLink}
            to="/create"
          />
          {this.props.currentUser ? (
            <>
              <Menu.Item
                color={"yellow"}
                name={"MY LEVELS"}
                as={NavLink}
                to="/mylevels"
              />
              <Menu.Item name="LOG-OUT" onClick={this.props.logOut}>
                LOG OUT {" - "}(
                {this.props.currentUser
                  ? this.props.currentUser.user_name
                  : null}
                )
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item
                color={"yellow"}
                name={"SIGN UP"}
                as={NavLink}
                to="/signup"
              />
              <Menu.Item
                color={"red"}
                name={"LOG IN"}
                as={NavLink}
                to="/login"
              />
            </>
          )}
        </Menu>
        <h3>
          {!this.props.currentUser
            ? "sign up to track your progress and create levels"
            : null}
        </h3>
      </>
    )
  }
}
