import React from "react"
import GameBoard from "./GameBoard.js"

const COLORS = {
  red: "red",
  blue: "blue",
  yellow: "yellow",
  green: "green",
  purple: "purple",
  orange: "orange",
  wall: "darkgrey",
  floor: "lightgrey",
  player: "white"
}

export default class Game extends React.Component {
  state = {
    boardDataArray: [],
    playerPosition: { x: undefined, y: undefined }
  }

  componentDidMount() {
    this.setState({
      playerPosition: this.getPlayerPositionFromBoard(this.props.board),
      boardDataArray: this.props.board
    })
    document.addEventListener("keydown", this.handleKeyDown)
  }

  componentDidUpdate(prevProps, prevState) {
    let newBoard = this.updatePlayerOnBoard(prevState)
    if (newBoard) {
      this.setState({
        boardDataArray: [...newBoard]
      })
    }
  }

  handleKeyDown = event => {
    if (event.key === "a") {
      this.movePlayer(-1, 0)
    }
    if (event.key === "d") {
      this.movePlayer(1, 0)
    }
    if (event.key === "w") {
      this.movePlayer(0, -1)
    }
    if (event.key === "s") {
      this.movePlayer(0, 1)
    }
  }

  movePlayer = (dx, dy) => {
    const newSquare = {
      x: this.state.playerPosition.x + dx,
      y: this.state.playerPosition.y + dy
    }

    let movingBlocks = this.checkMove(
      this.state.playerPosition.x,
      this.state.playerPosition.y,
      newSquare.x,
      newSquare.y
    )

    if (movingBlocks) {
      let newBoard = this.moveBlocks(movingBlocks, dx, dy)
      this.setState({
        playerPosition: newSquare,
        boardDataArray: [...newBoard]
      })
    }
  }

  moveBlocks = (array, dx, dy) => {
    let newArray = [...this.state.boardDataArray.map(array => [...array])]
    array.reverse().forEach(block => {
      newArray[block.y + dy][block.x + dx] = newArray[block.y][block.x]
    })
    return newArray
  }

  checkMove = (oldx, oldy, newx, newy, movingBlocks = []) => {
    const dir = { dx: newx - oldx, dy: newy - oldy }
    if (!this.checkSquareExists(newx, newy)) return false
    if (this.getSquare(newx, newy) === COLORS.floor) return movingBlocks
    movingBlocks = [...movingBlocks, { x: newx, y: newy }]
    return this.checkMove(
      newx,
      newy,
      newx + dir.dx,
      newy + dir.dy,
      movingBlocks
    )
  }

  getSquare = (x, y) => this.state.boardDataArray[y][x]

  changeSquareColor = (array, x, y, color) => {
    let newArray = [...array]
    newArray[y][x] = color
    return newArray
  }

  checkSquareExists = (x, y) =>
    this.state.boardDataArray[y] && this.state.boardDataArray[y][x]

  updatePlayerOnBoard = prevState => {
    if (prevState.playerPosition.x) {
      let newArray = [...this.state.boardDataArray.map(array => [...array])]
      newArray = this.changeSquareColor(
        newArray,
        this.state.playerPosition.x,
        this.state.playerPosition.y,
        COLORS.player
      )
      newArray = this.changeSquareColor(
        newArray,
        prevState.playerPosition.x,
        prevState.playerPosition.y,
        COLORS.floor
      )
      if (
        this.state.playerPosition.x !== prevState.playerPosition.x ||
        this.state.playerPosition.y !== prevState.playerPosition.y
      )
        return newArray
    }
  }

  getPlayerPositionFromBoard = array => {
    let columnIndex = undefined
    let rowIndex = array.findIndex(row =>
      row.find(cell => cell === COLORS.player)
    )
    if (rowIndex) {
      columnIndex = array[rowIndex].findIndex(cell => cell === COLORS.player)
    }
    return { x: columnIndex, y: rowIndex }
  }

  render() {
    const width = this.state.boardDataArray.length * 30
    return <GameBoard board={this.state.boardDataArray} width={width} />
  }
}
