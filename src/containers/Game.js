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
  player: "white",
  explode: "explode"
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
      newBoard = this.checkBoardForThrees(newBoard)
      this.setState({
        boardDataArray: [...newBoard]
      })
    }
  }

  handleKeyDown = event => {
    if (event.key === "a" || event.key === "ArrowLeft") {
      this.movePlayer(-1, 0)
    }
    if (event.key === "d" || event.key === "ArrowRight") {
      this.movePlayer(1, 0)
    }
    if (event.key === "w" || event.key === "ArrowUp") {
      this.movePlayer(0, -1)
    }
    if (event.key === "s" || event.key === "ArrowDown") {
      this.movePlayer(0, 1)
    }
  }

  movePlayer = (dx, dy) => {
    const newBlock = {
      x: this.state.playerPosition.x + dx,
      y: this.state.playerPosition.y + dy
    }
    const secondBlock = {
      x: newBlock.x + dx,
      y: newBlock.y + dy
    }
    let movingBlocks = this.checkMove(
      this.state.playerPosition.x,
      this.state.playerPosition.y,
      newBlock.x,
      newBlock.y
    )
    if (movingBlocks) {
      let newBoard = this.moveBlocks(movingBlocks, dx, dy)
      this.setState({
        playerPosition: newBlock,
        boardDataArray: [...newBoard]
      })
    } else {
      if (this.combineBlocks(newBlock, secondBlock)) {
        let newBoard = this.combineBlocks(newBlock, secondBlock)
        this.setState({
          playerPosition: newBlock,
          boardDataArray: [...newBoard]
        })
      }
    }
  }

  combineBlocks = (blockA, blockB) => {
    if (!this.checkBlockExists(blockA.x, blockB.y)) {
      return false
    }
    if (!this.checkBlockExists(blockB.x, blockB.y)) {
      return false
    }
    let newArray = [...this.state.boardDataArray.map(array => [...array])]
    if (
      this.blocksCanCombine(
        this.getBlock(blockA.x, blockA.y),
        this.getBlock(blockB.x, blockB.y)
      )
    ) {
      let color = this.blocksCanCombine(
        this.getBlock(blockA.x, blockA.y),
        this.getBlock(blockB.x, blockB.y)
      )
      newArray[blockB.y][blockB.x] = color
      return newArray
    }
    return false
  }

  moveBlocks = (array, dx, dy) => {
    let newArray = [...this.state.boardDataArray.map(array => [...array])]
    array.reverse().forEach(block => {
      newArray[block.y + dy][block.x + dx] = newArray[block.y][block.x]
    })
    return newArray
  }

  checkMove = (oldx, oldy, newx, newy, movingBlocks = []) => {
    const dir = {
      dx: newx - oldx,
      dy: newy - oldy
    }
    if (!this.checkBlockExists(newx, newy)) return false
    if (this.getBlock(newx, newy) === COLORS.wall) return false
    if (this.getBlock(newx, newy) === COLORS.explode) return false
    if (this.getBlock(newx, newy) === COLORS.floor) return movingBlocks
    movingBlocks = [...movingBlocks, { x: newx, y: newy }]
    return this.checkMove(
      newx,
      newy,
      newx + dir.dx,
      newy + dir.dy,
      movingBlocks
    )
  }

  blocksCanCombine = (blockA, blockB) => {
    if (blockA === COLORS.yellow && blockB === COLORS.blue) {
      return "green"
    }
    if (blockA === COLORS.blue && blockB === COLORS.yellow) {
      return "green"
    }
    if (blockA === COLORS.yellow && blockB === COLORS.red) {
      return "orange"
    }
    if (blockA === COLORS.red && blockB === COLORS.yellow) {
      return "orange"
    }
    if (blockA === COLORS.red && blockB === COLORS.blue) {
      return "purple"
    }
    if (blockA === COLORS.blue && blockB === COLORS.red) {
      return "purple"
    }
    return false
  }

  getBlock = (x, y, array = this.state.boardDataArray) => array[y][x]

  changeBlockColor = (array, x, y, color) => {
    let newArray = [...array]
    newArray[y][x] = color
    return newArray
  }

  checkBlockExists = (x, y, array = this.state.boardDataArray) =>
    array[y] && array[y][x]

  updatePlayerOnBoard = prevState => {
    if (prevState.playerPosition.x) {
      let newArray = [...this.state.boardDataArray.map(array => [...array])]
      newArray = this.changeBlockColor(
        newArray,
        this.state.playerPosition.x,
        this.state.playerPosition.y,
        COLORS.player
      )
      newArray = this.changeBlockColor(
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

  checkBoardForThrees = inputArray => {
    let checkHorisontalyForThrees = this.checkHorisontalyForThrees(inputArray)

    let newArray = inputArray.map((row, rowi) => {
      return row.map((block, columni) =>
        checkHorisontalyForThrees[rowi][columni] ? COLORS.floor : block
      )
    })
    return newArray
  }

  checkHorisontalyForThrees = inputArray => {
    let threesArray = inputArray.map((row, yi, array) => {
      return row.map((block, i) => {
        let prevBlock = this.checkBlockExists(i - 1, yi, array)
          ? this.getBlock(i - 1, yi, array)
          : undefined
        let prevPrevBlock = this.checkBlockExists(i - 2, yi, array)
          ? this.getBlock(i - 2, yi, array)
          : undefined
        let nextBlock = this.checkBlockExists(i + 1, yi, array)
          ? this.getBlock(i + 1, yi, array)
          : undefined
        let nextNextBlock = this.checkBlockExists(i + 2, yi, array)
          ? this.getBlock(i + 2, yi, array)
          : undefined
        if (block === COLORS.wall) return false
        if (block === COLORS.floor) return false
        if (nextBlock === block && nextNextBlock === block) {
          return true
        }
        if (prevBlock === block && nextBlock === block) {
          return true
        }
        if (prevBlock === block && prevPrevBlock === block) {
          return true
        }
        return false
      })
    })
    return threesArray
  }

  render() {
    const width = this.state.boardDataArray.length * 35
    return <GameBoard board={this.state.boardDataArray} width={width} />
  }
}
