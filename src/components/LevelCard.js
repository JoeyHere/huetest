import React from "react"
import { Card, Image } from "semantic-ui-react"
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
    let css = {
      backgroundColor: firstPixel,
      boxShadow: generatedBoxShadow,
      height: `${pixelSize}px`,
      width: `${pixelSize}px`,
      position: "relative"
    }

    return (
      <div
        className={"levelPreview"}
        style={{
          height: `${gameBoard.length * Math.floor(100 / gameBoard.length)}px`,
          width: `${gameBoard[0].length * Math.floor(100 / gameBoard.length)}px`
        }}
      >
        <div style={css} />
      </div>
    )
  }

  render() {
    let board = JSON.parse(this.props.level_data)
    let preview = this.generateCSS(board, Math.floor(100 / board.length))

    let userMeta = this.props.user
      ? `by ${this.props.user.user_name}`
      : "by HUEman"

    let extraStyle = this.props.completed
      ? { backgroundColor: "rgb(229, 255, 224)", textAlign: "right" }
      : { backgroundColor: "rgb(252, 207, 207)", textAlign: "right" }

    return (
      <Card
        color={this.props.completed ? "green" : "red"}
        onClick={() => this.props.handleLevelClick(this.props.id)}
        style={{ height: "280px", width: "220px" }}
      >
        <Card.Content>{preview}</Card.Content>
        <Card.Content>
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
