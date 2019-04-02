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
    document.addEventListener("keypress", this.handleKeyDown)
  }

  componentDidUpdate(prevProps, prevState) {
    let newBoard = this.updateBoard(prevState)
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
    if (
      this.checkMove(
        this.state.playerPosition.x,
        this.state.playerPosition.y,
        newSquare.x,
        newSquare.y
      )
    )
      this.setState({ playerPosition: newSquare })
  }

  checkMove = (oldx, oldy, newx, newy) => {
    const dir = { dx: newx - oldx, dy: newy - oldy }
    if (!this.checkSquareExists(newx, newy)) return false
    if (this.getSquare(newx, newy).color === COLORS.floor) return true
    if (this.getSquare(newx, newy).color === COLORS.wall) return false
    return this.checkMove(newx, newy, newx + dir.dx, newy + dir.dy)
  }

  getSquare = (x, y) => this.state.boardDataArray[y][x]

  changeSquareColor = (array, x, y, color) => {
    let mutatedArray = [...array]
    mutatedArray[y][x].color = color
    return mutatedArray
  }

  checkSquareExists = (x, y) =>
    this.state.boardDataArray[y] && this.state.boardDataArray[y][x]

  updateBoard = prevState => {
    if (prevState.playerPosition.x) {
      let newArray = [...this.state.boardDataArray]
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
      row.find(cell => cell.color === COLORS.player)
    )
    if (rowIndex) {
      columnIndex = array[rowIndex].findIndex(
        cell => cell.color === COLORS.player
      )
    }
    return { x: columnIndex, y: rowIndex }
  }

  render() {
    const width = this.state.boardDataArray.length * 30
    return <GameBoard board={this.state.boardDataArray} width={width} />
  }
}
