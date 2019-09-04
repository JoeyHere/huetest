import React, { Component } from "react"
import { Menu, Image } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Navbar extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Menu
          style={{ height: "48px" }}
          size={"small"}
          // stackable={true}
          id="navBar"
          widths={5}
          tabular
          borderless
        >
          <Menu.Item
            style={{ maxWidth: "230px", height: "40px", marginTop: "8px" }}
            color={"green"}
            name="PLAY"
            as={NavLink}
            to="/levels"
          />
          <Menu.Item
            style={{ maxWidth: "230px", height: "40px", marginTop: "8px" }}
            color={"blue"}
            icon={!this.props.currentUser ? "lock" : null}
            name="CREATE"
            as={NavLink}
            to="/create"
          />
          <Image
            // className={"hueLogo"}
            style={{
              margin: "10px",
              width: "27px",
              height: "27px"
            }}
            src="https://i.ibb.co/HF4Jm1K/hmframe3.png"
          />
          <Image
            className={"hueLogo"}
            // rounded
            style={{
              marginRight: "20px",
              marginLeft: "20px",
              width: "150px",
              height: "40px",
              margin: "4px",
              padding: "0px"
            }}
            src="https://i.ibb.co/5hv8kw3/losgo.png"
          />
          <Image
            className={"hueLogo"}
            style={{
              margin: "10px",
              width: "27px",
              height: "27px"
            }}
            src="https://i.ibb.co/fHMm8Rw/brown.png"
          />
          <Menu.Item
            style={{ maxWidth: "230px", height: "40px", marginTop: "8px" }}
            color={"orange"}
            name={"MY LEVELS"}
            icon={!this.props.currentUser ? "lock" : null}
            as={NavLink}
            to="/mylevels"
          />
          {this.props.currentUser ? (
            <>
              <Menu.Item
                style={{ maxWidth: "230px", height: "40px", marginTop: "8px" }}
                name="LOG-OUT"
                onClick={this.props.logOut}
              >
                LOG OUT ({" "}
                {this.props.currentUser
                  ? this.props.currentUser.user_name
                  : null}{" "}
                )
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item
                style={{ maxWidth: "230px", height: "40px", marginTop: "8px" }}
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
          {!this.props.currentUser ? (
            <>
              <a href="/signup">
                <u>SIGN UP</u>
              </a>{" "}
              TO TRACK PROGRESS AND CREATE LEVELS{" "}
            </>
          ) : null}
        </h4>
      </>
    )
  }
}
