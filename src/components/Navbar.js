import React, { Component } from "react"
import { Menu, Image, Header } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Navbar extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Menu
          style={{ height: "48px" }}
          size={"small"}
          stackable={true}
          id="navBar"
          widths={7}
          tabular
          borderless
        >
          <Menu.Item color={"green"} name="PLAY" as={NavLink} to="/levels" />
          <Menu.Item
            color={"blue"}
            icon={!this.props.currentUser ? "lock" : null}
            name="CREATE"
            as={NavLink}
            to="/create"
          />
          <Image
            style={{
              margin: "10px",
              marginLeft: "20px",
              width: "27px",
              height: "27px"
            }}
            src="https://i.ibb.co/fHMm8Rw/brown.png"
          />
          <Image
            rounded
            className={"hueLogo"}
            style={{
              margin: "10px",
              marginRight: "10px",
              marginLeft: "10px",
              width: "150px",
              height: "40px",
              margin: "4px",
              padding: "0px"
            }}
            src="https://i.ibb.co/f8mHszP/loogo.png"
          />
          <Image
            style={{
              margin: "10px",
              marginRight: "20px",
              width: "27px",
              height: "27px"
            }}
            src="https://i.ibb.co/fHMm8Rw/brown.png"
          />
          <Menu.Item
            color={"orange"}
            name={"MY LEVELS"}
            icon={!this.props.currentUser ? "lock" : null}
            as={NavLink}
            to="/mylevels"
          />
          {this.props.currentUser ? (
            <>
              <Menu.Item name="LOG-OUT" onClick={this.props.logOut}>
                LOG OUT {" - "}({" "}
                {this.props.currentUser
                  ? this.props.currentUser.user_name
                  : null}{" "}
                )
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item
                color={"red"}
                name={"LOG IN"}
                as={NavLink}
                to="/login"
              />
            </>
          )}
          {/* <Button compact basic style={{ marginLeft: "30px" }}>
            <Icon name="question circle" />
            About
          </Button> */}
        </Menu>
        <h4>
          {!this.props.currentUser
            ? "SIGN UP TO TRACK PROGRESS AND CREATE LEVELS"
            : null}
        </h4>
      </>
    )
  }
}
