import React, { Component } from "react"
import { Segment, Image } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Footer extends Component {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div className={"footer"}>
        <Segment basic>
          {/* <h5 style={{ display: "inline-block", marginLeft: "40px" }}>
            HUEman © 2019
          </h5> */}
          <NavLink
            to="/about"
            as="h5"
            // target="_blank"
            // rel="noopener noreferrer"
            style={{
              display: "inline-block",
              float: "right",
              position: "relative",
              marginRight: "20px"
            }}
          >
            About HUEman{" "}
            <Image
              style={{ width: "20px", display: "inline-block" }}
              src="https://i.ibb.co/HF4Jm1K/hmframe3.png"
            />
          </NavLink>
        </Segment>
      </div>
    )
  }
}
