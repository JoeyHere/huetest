import React from "react"
import { Card } from "semantic-ui-react"
import { Link } from "react-router-dom"
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
      left: "33%",
      top: "25%"
    }
  }

  render() {
    let board = JSON.parse(this.props.level_data)
    let CSS = this.generateCSS(board, Math.floor(100 / board.length))

    return (
      <Card
        as={Link}
        to={`/levels/${this.props.id}`}
        style={{ height: "200px" }}
      >
        <Card.Content>
          <div style={CSS} />
          <div style={{ float: "left" }}>{this.props.name}</div>
        </Card.Content>
      </Card>
    )
  }
}

export default LevelCard
