import React, { Component } from "react"
import { Segment, Image, Header, Divider, Icon } from "semantic-ui-react"
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
            marginTop: "65px",
            height: "300px"
          }}
        >
          <Segment basic style={{ marginRight: "35px" }}>
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
          <Segment
            basic
            style={{
              display: "inline-block",
              width: "600px"
            }}
          >
            <Header>About HUEman</Header>
            <h5>
              HUEman is a simple game based arround pushing different colour
              blocks. You can play levels made by the HUEman team or you can
              play any of the user generated levels created so far!
            </h5>
            <h5>
              Levels can be created and published for other users to attempt to
              beat. User generated levels must be completed before they can be
              published ( so no level is imposible, even if some seem like it!
              ).
            </h5>
          </Segment>
        </div>
        <Divider
          style={{
            width: "700px",
            margin: "auto",
            marginTop: "0px",
            marginBottom: "40px"
          }}
        />{" "}
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
              Hi, I'm Joey the creator of HUEman. I created the game and level
              sharing platform HUEman as my final project at Flatiron School.
              The front-end is made primarily in React.js, while the backend is
              written in Ruby on Rails.
            </h5>
            <h5>
              Since graduating and working as a Developer I have continued to
              improve and maintain HUEman in my spare time. If you have any
              suggestions on ways HUEman can be improved please feel free to
              contact me.
            </h5>
            <h5 style={{ display: "inline-block" }}>I'm here: </h5>{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/joseph-odell/"
            >
              <Icon size="big" name="linkedin" />
            </a>
            <h5 style={{ display: "inline-block" }}>and here: </h5>{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/JoeyHere"
            >
              <Icon size="big" name="github" />
            </a>
          </Segment>
        </div>
      </>
    )
  }
}
