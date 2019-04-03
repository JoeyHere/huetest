import React from "react"
import GameBoard from "./GameBoard.js"

export default class Game extends React.Component {
  state = {
    currentBoard: [],
    playerPosition: { x: undefined, y: undefined }
  }

  render() {
    const width = this.state.currentBoard.length * 35
    return <GameBoard board={this.state.currentBoard} width={width} />
  }
}
