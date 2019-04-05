import React from "react"
import GameBoard from "./GameBoard.js"
import Palette from "../components/Palette.js"
import { BLOCKS } from "../concerns/Config.js"
import API from "../concerns/API.js"

export default class LevelEditor extends React.Component {
  state = {
    currentBoard: [
      [10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 10],
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    ],
    selectedColor: 2
  }

  componentDidMount() {
    // API.getLevelFromId(1).then(level => {
    //   let levelData = JSON.parse(level.level_data)
    //   this.setState({
    //     currentBoard: levelData
    //   })
    // })
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
