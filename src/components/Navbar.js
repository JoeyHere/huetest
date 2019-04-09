import React, { Component } from "react"
import { Menu, Image } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Navbar extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Menu stackable={true} id="navBar" widths={5} attached="top" tabular>
          <Menu.Item name="PLAY" as={NavLink} to="/levels" />
          <Menu.Item name="CREATE" as={NavLink} to="/create" />
          <Menu.Item>
            <Image src={"https://i.ibb.co/fHMm8Rw/brown.png"} />
            <Image src={"https://i.ibb.co/0scrPMV/red.png"} />
            <Image src={"https://i.ibb.co/THvVFLG/green.png"} />
            <Image src={"https://i.ibb.co/ZLVxh9P/yellow.png"} />
            <Image src={"https://i.ibb.co/nsm8vdz/blue.png"} />
            <Image src={"https://i.ibb.co/fHMm8Rw/brown.png"} />
          </Menu.Item>
          {this.props.currentUser ? (
            <>
              <Menu.Item
                name={"MY LEVELS"}
                position={"right"}
                as={NavLink}
                to="/mylevels"
              />
              <Menu.Item
                name="LOG-OUT"
                onClick={this.props.logOut}
                position={"right"}
              />
            </>
          ) : (
            <>
              <Menu.Item
                name={"SIGN UP"}
                position={"right"}
                as={NavLink}
                to="/signup"
              />
              <Menu.Item
                name={"LOG IN"}
                position={"right"}
                as={NavLink}
                to="/login"
              />
            </>
          )}
        </Menu>
      </>
    )
  }
}
