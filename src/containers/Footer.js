import React, { Component } from "react"
import { Segment, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default class Footer extends Component {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div className={"footer"}>
        <Segment>
          <h5 style={{ display: "inline-block", marginLeft: "40px" }}>
            HUEman © 2019
          </h5>
          <Link
            as="h5"
            to="https://www.linkedin.com/in/joseph-odell/"
            style={{
              display: "inline-block",
              float: "right",
              position: "relative",
              marginRight: "40px"
            }}
          >
            <Icon name="square outline" />
            About HUEman
          </Link>
        </Segment>
      </div>
    )
  }
}
