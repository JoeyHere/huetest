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
          height: `${gameBoard.length * 5}px`,
          width: `${gameBoard[0].length * 5}px`
        }}
      >
        <div style={css} />
      </div>
    )
  }

  render() {
    let board = JSON.parse(this.props.level_data)
    let preview = this.generateCSS(board, 5)

    let userMeta = this.props.user
      ? `by ${this.props.user.user_name}`
      : "by HUEman"

    let extraStyle =
      this.props.completed || this.props.userPublished
        ? { backgroundColor: "rgb(229, 255, 224)", textAlign: "center" }
        : { backgroundColor: "rgb(252, 207, 207)", textAlign: "center" }

    return (
      <Card
        color={
          this.props.completed || this.props.userPublished ? "green" : "red"
        }
        onClick={() => this.props.handleLevelClick(this.props.id)}
        style={{ width: "270px" }}
      >
        <Card.Content style={{ padding: "16px" }}>
          <Card.Header style={{ float: "left", padding: "5px" }}>
            {preview}
            {this.props.name}
          </Card.Header>
        </Card.Content>
        <Card.Content extra style={{ textAlign: "right" }}>
          {userMeta}
        </Card.Content>
        <Card.Content extra style={extraStyle}>
          🎲 {this.props.plays} | <span role="img">🏆</span>{" "}
          {this.props.completes} | 👍
          {this.props.upvotes
            ? (this.props.upvotes /
                (this.props.downvotes + this.props.upvotes)) *
              100
            : 0}
          % {this.props.completed ? " | ✅" : " | ❌"}{" "}
          {this.props.userPublished ? " | 📖" : null}
        </Card.Content>
      </Card>
    )
  }
}

export default LevelCard
