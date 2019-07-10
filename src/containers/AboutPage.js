import React, { Component } from "react"
import {
  Segment,
  Image,
  Header,
  Reveal,
  Container,
  Grid,
  Divider
} from "semantic-ui-react"
import { Link } from "react-router-dom"
import API from "../concerns/API.js"
import GameBoard from "./GameBoard.js"

export default class AboutPage extends Component {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <>
        <div
          className="about"
          style={{
            width: "900px",
            display: "flex",
            justifyContent: "center",
            marginTop: "65px"
          }}
        >
          <Segment
            basic
            style={{
              display: "inline-block"
            }}
          >
            <Image
              style={{
                width: "190px",
                boxShadow: "0px 0px 30px black",
                marginRight: "35px"
              }}
              circular
              src="https://i.ibb.co/4gHVn0z/profile.jpg"
            />
          </Segment>
          <Segment
            basic
            style={{
              display: "inline-block",
              width: "600px"
            }}
          >
            <Header>About Me</Header>
            <h5>
              I created the game a level sharing platform HUEman as my final
              project at Flatiron School. Since graduating and working as a
              Full-Stack developer I have continued to improve and maintain
              HUEman.
            </h5>
            <h5>
              The original inspiration for this project was arround two games.
              1. The Witness - A hugely complex game created by Jonathon Blow
              that centers arround seemingly simple puzzles. 2. Baba is You - An
              ingenious game that includes pushing blocks and changing the
              worlds rules to solve puzzles.
            </h5>
          </Segment>
        </div>
        <Divider
          style={{
            width: "700px",
            margin: "auto",
            marginTop: "40px",
            marginBottom: "40px"
          }}
        />
        <div
          className="about"
          style={{
            width: "900px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Segment
            basic
            style={{
              display: "inline-block",
              width: "600px"
            }}
          >
            <Header>About HUEman</Header>
            <h5>
              I created the game a level sharing platform HUEman as my final
              project at Flatiron School. Since graduating and working as a
              Full-Stack developer I have continued to improve and maintain
              HUEman.
            </h5>
            <h5>
              The original inspiration for this project was arround two games.
              1. The Witness - A hugely complex game created by Jonathon Blow
              that centers arround seemingly simple puzzles. 2. Baba is You - An
              ingenious game that includes pushing blocks and changing the
              worlds rules to solve puzzles.
            </h5>
          </Segment>
          <Segment basic style={{ width: "300px" }}>
            <GameBoard
              board={[
                [8, 10, 10, 10, 8],
                [10, 3, 0, 4, 10],
                [10, 0, 1, 0, 10],
                [10, 6, 0, 5, 10],
                [8, 10, 10, 10, 8]
              ]}
              width={5 * 35}
            />
          </Segment>
        </div>
      </>
    )
  }
}
