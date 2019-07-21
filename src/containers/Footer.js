import React, { Component } from "react"
import { Segment, Icon, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default class Footer extends Component {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div className={"footer"}>
        <Segment>
          {/* <h5 style={{ display: "inline-block", marginLeft: "40px" }}>
            HUEman © 2019
          </h5> */}
          <a
            href="https://www.linkedin.com/in/joseph-odell/"
            as="h5"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              float: "right",
              position: "relative",
              marginRight: "40px"
            }}
          >
            About HUEman{" "}
            <Image
              style={{ width: "20px", display: "inline-block" }}
              src="https://i.ibb.co/HF4Jm1K/hmframe3.png"
            />
          </a>
        </Segment>
      </div>
    )
  }
}
