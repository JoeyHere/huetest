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
  floorflash: "flash lightgrey"
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
    newBoard = newBoard ? (newBoard = this.removeFlashBlocks(newBoard)) : false
    if (newBoard) {
      newBoard = this.clearBoardOfThrees(newBoard)
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

  removeFlashBlocks = array => {
    let newArray = array.map(row =>
      row.map(block => (block === COLORS.floorflash ? COLORS.floor : block))
    )
    return newArray
  }

  movePlayer = (dx, dy) => {
    const newBlock = {
      x: this.state.playerPosition.x + dx,
      y: this.state.playerPosition.y + dy
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
      let newBoard = this.combineBlocks(newBlock, dx, dy)
      if (newBoard) {
        this.setState({
          playerPosition: newBlock,
          boardDataArray: [...newBoard]
        })
      }
    }
  }

  combineBlocks = (
    blockA,
    dx,
    dy,
    inputArray = [...this.state.boardDataArray.map(array => [...array])]
  ) => {
    let blockB = { x: blockA.x + dx, y: blockA.y + dy }

    if (!this.checkBlockExists(blockA.x, blockA.y)) {
      return false
    }
    if (!this.checkBlockExists(blockB.x, blockB.y)) {
      return false
    }

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
      inputArray[blockA.y][blockA.x] = this.getBlock(
        blockA.x - dx,
        blockA.y - dy,
        inputArray
      )
      inputArray[blockB.y][blockB.x] = color
      return inputArray
    } else {
      inputArray[blockA.y][blockA.x] = this.getBlock(
        blockA.x,
        blockA.y,
        inputArray
      )
      inputArray[blockB.y][blockB.x] = this.getBlock(
        blockB.x,
        blockB.y,
        inputArray
      )
    }
    return this.combineBlocks(blockB, dx, dy, inputArray)
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
    if (
      this.getBlock(newx, newy) === COLORS.floor ||
      this.getBlock(newx, newy) === COLORS.floorflash
    )
      return movingBlocks
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

  clearBoardOfThrees = inputArray => {
    let threesArray = this.checkArrayForThrees(inputArray)

    let newArray = inputArray.map((row, rowi) => {
      return row.map((block, columni) =>
        threesArray[rowi][columni] ? COLORS.floorflash : block
      )
    })
    return newArray
  }

  checkArrayForThrees = inputArray => {
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
        let downBlock = this.checkBlockExists(i, yi + 1, array)
          ? this.getBlock(i, yi + 1, array)
          : undefined
        let downDownBlock = this.checkBlockExists(i, yi + 2, array)
          ? this.getBlock(i, yi + 2, array)
          : undefined
        let upBlock = this.checkBlockExists(i, yi - 1, array)
          ? this.getBlock(i, yi - 1, array)
          : undefined
        let upUpBlock = this.checkBlockExists(i, yi - 2, array)
          ? this.getBlock(i, yi - 2, array)
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
        if (downBlock === block && downDownBlock === block) {
          return true
        }
        if (upBlock === block && downBlock === block) {
          return true
        }
        if (upBlock === block && upUpBlock === block) {
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
