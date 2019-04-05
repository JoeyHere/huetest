import React from "react"
import GameBoard from "./GameBoard.js"
import { BLOCKS } from "./Config.js"
// import Controller from "./Controller.js"

export default class Game extends React.Component {
  state = {
    currentBoard: [],
    playerPosition: { x: undefined, y: undefined },
    levelName: "TEST"
    // keydown: false
  }

  componentDidMount() {
    this.getLevelFromId(this.props.id).then(level => {
      let levelData = JSON.parse(level.level_data)
      this.setState({
        playerPosition: this.getPlayerPositionFromBoard(levelData),
        currentBoard: levelData,
        levelName: level.name
      })
    })

    document.addEventListener("keydown", this.handleKeyDown)
    // document.addEventListener("keyup", this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
    // document.removeEventListener("keyup", this.handleKeyUp)
  }

  handleKeyDown = event => {
    if (!this.state.keydown) {
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
      // setTimeout(this.handleKeyUp, 100)
    }
    // this.setState({
    //   keydown: true
    // })
  }

  handleKeyUp = () => {
    this.setState({ keydown: false })
  }

  getLevelFromId = id => {
    const API = `http://localhost:3000/levels/${id}`

    return fetch(API).then(res => res.json())
  }

  handleBlockClick = (blockx, blocky) => {
    console.log("stop clicking on the blocks and solve the puzzle!")
  }

  removeFlashBlocks = array => {
    let newArray = array.map(row =>
      row.map(block => (block === BLOCKS.flash ? BLOCKS.floor : block))
    )
    return newArray
  }

  movePlayer = (dx, dy) => {
    let currentBoard = [...this.state.currentBoard.map(array => [...array])]
    const newBlock = {
      x: this.state.playerPosition.x + dx,
      y: this.state.playerPosition.y + dy
    }
    let movingBlocks = this.getMovingBlocks(
      this.state.playerPosition.x,
      this.state.playerPosition.y,
      newBlock.x,
      newBlock.y
    )
    if (movingBlocks) {
      currentBoard = this.moveBlocks(movingBlocks, dx, dy, currentBoard)
    } else {
      currentBoard = this.combineBlocks(newBlock, dx, dy)
    }

    if (currentBoard) {
      currentBoard = this.updatePlayerOnBoard(
        this.state.playerPosition,
        newBlock,
        currentBoard
      )
      currentBoard = this.removeFlashBlocks(currentBoard)
      currentBoard = this.clearBoardOfThrees(currentBoard)
      this.setState({
        playerPosition: newBlock,
        currentBoard: currentBoard
      })
    }
  }

  combineBlocks = (blockA, dx, dy, movingBlocks = []) => {
    let inputArray = [...this.state.currentBoard.map(array => [...array])]
    let blockB = { x: blockA.x + dx, y: blockA.y + dy }

    if (!this.checkBlockExists(blockA.x, blockA.y)) {
      return false
    }
    if (!this.checkBlockExists(blockB.x, blockB.y)) {
      return false
    }
    if (
      this.blocksCanCombine(
        this.getBlock(blockA.x, blockA.y, inputArray),
        this.getBlock(blockB.x, blockB.y, inputArray)
      )
    ) {
      let color = this.blocksCanCombine(
        this.getBlock(blockA.x, blockA.y, inputArray),
        this.getBlock(blockB.x, blockB.y, inputArray)
      )
      movingBlocks = [...movingBlocks, { x: blockA.x, y: blockA.y }]
      let newArray = this.moveBlocks(movingBlocks, dx, dy, inputArray)
      newArray[blockB.y][blockB.x] = color
      return newArray
    } else {
      movingBlocks = [...movingBlocks, { x: blockA.x, y: blockA.y }]
    }
    return this.combineBlocks(blockB, dx, dy, movingBlocks)
  }

  moveBlocks = (array, dx, dy, board) => {
    array.reverse().forEach(block => {
      board[block.y + dy][block.x + dx] = board[block.y][block.x]
    })
    return board
  }

  getMovingBlocks = (oldx, oldy, newx, newy, movingBlocks = []) => {
    const dir = {
      dx: newx - oldx,
      dy: newy - oldy
    }
    if (!this.checkBlockExists(newx, newy)) return false
    if (this.getBlock(newx, newy) === BLOCKS.wall) return false
    if (
      this.getBlock(newx, newy) === BLOCKS.floor ||
      this.getBlock(newx, newy) === BLOCKS.flash
    )
      return movingBlocks
    movingBlocks = [...movingBlocks, { x: newx, y: newy }]
    return this.getMovingBlocks(
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
    array[y][x] = color
    return array
  }

  checkBlockExists = (x, y, array = this.state.currentBoard) =>
    array[y] && array[y][x]

  // * look into improving this method and removing the component did update. it should look cleaner.
  updatePlayerOnBoard = (oldblock, newblock, array) => {
    array = this.changeBlockColor(array, newblock.x, newblock.y, BLOCKS.player)
    array = this.changeBlockColor(array, oldblock.x, oldblock.y, BLOCKS.floor)
    return array
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
        threesArray[rowi][columni] ? BLOCKS.flash : block
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
        if (block === BLOCKS.brown) return false
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
    return (
      <div>
        <h1>{this.state.levelName}</h1>
        <GameBoard
          board={this.state.currentBoard}
          width={width}
          handleBlockClick={this.handleBlockClick}
        />
        {/* <Controller
          handleBlockClick={this.handlePaletteCLick}
          selectedBlock={this.state.selectedColor}
        /> */}
      </div>
    )
  }
}
