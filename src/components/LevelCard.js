import React from "react"
import { Card } from "semantic-ui-react"
import { BLOCKCOLORS } from "../concerns/Config"

class LevelCard extends React.Component {
  generateCSS = (gameBoard = [[]], pixelSize = 10) => {
    let generatedBoxShadow = ""
    let firstPixel = BLOCKCOLORS[gameBoard[0][0]]
    gameBoard.forEach((row, ri) =>
      row.forEach((block, ci) => {
        generatedBoxShadow += `${ci * pixelSize}px ${ri * pixelSize}px 0 0 ${
          BLOCKCOLORS[block]
        }, `
      })
    )
    generatedBoxShadow = generatedBoxShadow.slice(0, -2)
    return {
      backgroundColor: firstPixel,
      boxShadow: generatedBoxShadow,
      height: `${pixelSize}px`,
      width: `${pixelSize}px`,
      position: "relative",
      left: "60%",
      top: "29%"
    }
  }

  render() {
    let board = JSON.parse(this.props.level_data)
    let CSS = this.generateCSS(board, Math.floor(100 / board.length))

    let userMeta = this.props.user
      ? `by ${this.props.user.user_name}`
      : "by HUEman"

    let extraStyle = this.props.completed
      ? { backgroundColor: "rgb(229, 255, 224)" }
      : { backgroundColor: "rgb(252, 207, 207)" }

    return (
      <Card
        color={this.props.completed ? "green" : "red"}
        onClick={() => this.props.handleLevelClick(this.props.id)}
        style={{ height: "200px", width: "280px" }}
      >
        <Card.Content>
          <div className={"levelPreview"} style={CSS} />
          <Card.Header style={{ float: "left" }}>
            {this.props.name} <Card.Meta>{userMeta}</Card.Meta>{" "}
          </Card.Header>
        </Card.Content>
        <Card.Content extra style={extraStyle}>
          🎲 {this.props.plays} | 🏆 {this.props.completes}{" "}
          {this.props.completed ? "| ✅" : "| ❌"}
        </Card.Content>
      </Card>
    )
  }
}

export default LevelCard
