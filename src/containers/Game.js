import React from "react"
import GameBoard from "./GameBoard.js"

const BLOCKS = {
  red: "red",
  blue: "blue",
  yellow: "yellow",
  green: "green",
  purple: "purple",
  orange: "orange",
  wall: "darkgrey",
  floor: "lightgrey",
  player: "white",
  floorflash: "flash"
}

export default class Game extends React.Component {
  state = {
    currentBoard: [],
    playerPosition: { x: undefined, y: undefined }
  }

  componentDidMount() {
    this.setState({
      playerPosition: this.getPlayerPositionFromBoard(this.props.board),
      currentBoard: this.props.board
    })
    document.addEventListener("keydown", this.handleKeyDown)
  }

  componentDidUpdate(prevProps, prevState) {
    let newBoard = this.updatePlayerOnBoard(prevState)
    newBoard = newBoard ? (newBoard = this.removeFlashBlocks(newBoard)) : false
    if (newBoard) {
      newBoard = this.clearBoardOfThrees(newBoard)
      this.setState({
        currentBoard: [...newBoard]
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
      row.map(block => (block === BLOCKS.floorflash ? BLOCKS.floor : block))
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
        currentBoard: [...newBoard]
      })
    } else {
      let newBoard = this.combineBlocks(newBlock, dx, dy)
      if (newBoard) {
        this.setState({
          playerPosition: newBlock,
          currentBoard: [...newBoard]
        })
      }
    }
  }

  combineBlocks = (
    blockA,
    dx,
    dy,
    inputArray = [...this.state.currentBoard.map(array => [...array])]
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
    let newArray = [...this.state.currentBoard.map(array => [...array])]
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
    if (this.getBlock(newx, newy) === BLOCKS.wall) return false
    if (
      this.getBlock(newx, newy) === BLOCKS.floor ||
      this.getBlock(newx, newy) === BLOCKS.floorflash
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
    if (blockA === BLOCKS.yellow && blockB === BLOCKS.blue) {
      return BLOCKS.green
    }
    if (blockA === BLOCKS.blue && blockB === BLOCKS.yellow) {
      return BLOCKS.green
    }
    if (blockA === BLOCKS.yellow && blockB === BLOCKS.red) {
      return BLOCKS.orange
    }
    if (blockA === BLOCKS.red && blockB === BLOCKS.yellow) {
      return BLOCKS.orange
    }
    if (blockA === BLOCKS.red && blockB === BLOCKS.blue) {
      return BLOCKS.purple
    }
    if (blockA === BLOCKS.blue && blockB === BLOCKS.red) {
      return BLOCKS.purple
    }
    return false
  }

  getBlock = (x, y, array = this.state.currentBoard) => array[y][x]

  changeBlockColor = (array, x, y, color) => {
    let newArray = [...array]
    newArray[y][x] = color
    return newArray
  }

  checkBlockExists = (x, y, array = this.state.currentBoard) =>
    array[y] && array[y][x]

  updatePlayerOnBoard = prevState => {
    if (prevState.playerPosition.x) {
      let newArray = [...this.state.currentBoard.map(array => [...array])]
      newArray = this.changeBlockColor(
        newArray,
        this.state.playerPosition.x,
        this.state.playerPosition.y,
        BLOCKS.player
      )
      newArray = this.changeBlockColor(
        newArray,
        prevState.playerPosition.x,
        prevState.playerPosition.y,
        BLOCKS.floor
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
      row.find(cell => cell === BLOCKS.player)
    )
    if (rowIndex) {
      columnIndex = array[rowIndex].findIndex(cell => cell === BLOCKS.player)
    }
    return { x: columnIndex, y: rowIndex }
  }

  clearBoardOfThrees = inputArray => {
    let threesArray = this.checkArrayForThrees(inputArray)

    let newArray = inputArray.map((row, rowi) => {
      return row.map((block, columni) =>
        threesArray[rowi][columni] ? BLOCKS.floorflash : block
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
        if (block === BLOCKS.wall) return false
        if (block === BLOCKS.floor) return false
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
    const width = this.state.currentBoard.length * 35
    return <GameBoard board={this.state.currentBoard} width={width} />
  }
}
