import React from "react"
import GameBoard from "./GameBoard.js"
import Palette from "../components/Palette.js"
import { BLOCKS } from "./Config.js"

export default class LevelEditor extends React.Component {
  state = {
    currentBoard: [],
    playerPosition: { x: undefined, y: undefined },
    selectedColor: 2
  }

  componentDidMount() {
    this.setState({
      currentBoard: this.props.board
    })
  }

  handleBlockClick = (blockx, blocky) => {
    let currentBoard = [...this.state.currentBoard.map(array => [...array])]
    currentBoard[blocky][blockx] = this.state.selectedColor
    this.setState({
      currentBoard: currentBoard
    })
  }

  handlePaletteCLick = cell =>
    this.setState({
      selectedColor: BLOCKS[cell]
    })

  render() {
    const width = this.state.currentBoard.length * 35
    return (
      <div>
        <h3>EDITOR</h3>
        <GameBoard
          handleBlockClick={this.handleBlockClick}
          board={this.state.currentBoard}
          width={width}
        />
        <Palette
          handleBlockClick={this.handlePaletteCLick}
          selectedBlock={this.state.selectedColor}
        />
        <h3>{JSON.stringify(this.state.currentBoard)}</h3>
        <button onClick={() => this.props.handleSave(this.state.currentBoard)}>
          SAVE
        </button>
      </div>
    )
  }
}
