import React, { Component } from "react"
import {
  Segment,
  Image,
  Header,
  Reveal,
  Container,
  Grid,
  Divider,
  Icon
} from "semantic-ui-react"
import { Link } from "react-router-dom"

export default class Footer extends Component {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div className={"footer"}>
        <Segment style={{ backgroundColor: "rgb(245,245,245)" }}>
          <h5 style={{ display: "inline-block", marginLeft: "40px" }}>
            HUEman © 2019
          </h5>
          <Link
            as="h5"
            to="/about"
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
