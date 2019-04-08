import React, { Component } from "react"
import { Menu, Button, Image } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Navbar extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Menu widths={5} attached="top" tabular>
          <Image src={"https://i.ibb.co/t49MPMt/hmframe1.png"} />
          <Menu.Item name="PLAY" as={NavLink} to="/levels" />
          <Menu.Item name="CREATE" as={NavLink} to="/create" />
          {/* <Menu.Item name="discover" as={NavLink} to="/discover" /> */}
          <Image src={"https://i.ibb.co/fHMm8Rw/brown.png"} />
          <Image src={"https://i.ibb.co/0scrPMV/red.png"} />
          {/* <Image src={"https://i.ibb.co/whWk5bg/purple.png"} /> */}
          {/* <Image src={"https://i.ibb.co/THvVFLG/green.png"} /> */}
          {/* <Image src={"https://i.ibb.co/t49MPMt/hmframe1.png"} /> */}
          <Image src={"https://i.ibb.co/ZLVxh9P/yellow.png"} />
          {/* <Image src={"https://i.ibb.co/WByw4cs/orange.png"} /> */}
          <Image src={"https://i.ibb.co/nsm8vdz/blue.png"} />
          <Image src={"https://i.ibb.co/fHMm8Rw/brown.png"} />
          {this.props.currentUser ? (
            <Menu.Item
              name="LOG-OUT"
              onClick={this.props.logOut}
              position={"right"}
            />
          ) : (
            <>
              <Menu.Item position={"right"}>
                <Button primary as={NavLink} to="/signup">
                  SIGN UP
                </Button>
                <Button as={NavLink} to="/login">
                  LOG IN
                </Button>
              </Menu.Item>
            </>
          )}
          <Image src={"https://i.ibb.co/NmXKvJq/bombf2.png"} />
        </Menu>
      </div>
    )
  }
}
