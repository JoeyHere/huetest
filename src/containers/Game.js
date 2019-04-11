import React from "react"
import GameBoard from "./GameBoard.js"
import { BLOCKS } from "../concerns/Config.js"
import API from "../concerns/API.js"
import "../confetti.scss"
import Confetti from "../components/Confetti.js"
import { Button } from "semantic-ui-react"

export default class Game extends React.Component {
  state = {
    originalBoard: [[]],
    undoBoard: [[]],
    currentBoard: [[]],
    playerPosition: { x: undefined, y: undefined },
    levelName: "",
    levelWon: false,
    keydown: false
  }

  componentDidMount() {
    API.getLevelFromId(this.props.id).then(level => {
      if (level) {
        let levelData = JSON.parse(level.level_data)
        this.setState({
          playerPosition: this.getPlayerPositionFromBoard(levelData),
          originalBoard: levelData,
          currentBoard: levelData,
          undoBoard: levelData,
          levelName: level.name
        })
        API.playedLevel(this.props.id)
      } else {
        this.props.history.push(`/levels`)
      }
    })

    document.addEventListener("keydown", this.handleKeyDown)
    document.addEventListener("keyup", this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
    document.removeEventListener("keyup", this.handleKeyUp)
  }

  handleKeyDown = event => {
    if (this.state.levelWon === false) {
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
        if (event.key === "r" || event.key === " ") {
          this.resetLevel()
        }
        if (event.key === "u") {
          this.undoMove()
        }
        setTimeout(this.handleKeyUp, 50)
      }
      this.setState({
        keydown: true
      })
    }
  }

  handleKeyUp = () => {
    this.setState({ keydown: false })
  }

  handleBlockClick = (blockx, blocky) => {
    console.log("stop clicking on the blocks and solve the puzzle!")
  }

  removeFlashBlocks = array => {
    let newArray = array.map(row =>
      row.map(block => {
        if (block === BLOCKS.flash) {
          return BLOCKS.floor
        }
        if (block === BLOCKS.explode) {
          return BLOCKS.floor
        }
        if (block === BLOCKS.combineGreen) {
          return BLOCKS.green
        }
        if (block === BLOCKS.combineOrange) {
          return BLOCKS.orange
        }
        if (block === BLOCKS.combinePurple) {
          return BLOCKS.purple
        }
        return block
      })
    )
    return newArray
  }

  winGame = () => {
    API.completedLevel(this.props.id)
    this.setState({
      levelWon: true
    })
  }

  movePlayer = (dx, dy) => {
    let currentBoard = [...this.state.currentBoard.map(array => [...array])]
    currentBoard = this.removeFlashBlocks(currentBoard)
    const newBlock = {
      x: this.state.playerPosition.x + dx,
      y: this.state.playerPosition.y + dy
    }
    if (!this.checkBlockExists(newBlock.x, newBlock.y)) {
      this.winGame()
    }
    let movingBlocks = this.getMovingBlocks(
      this.state.playerPosition.x,
      this.state.playerPosition.y,
      newBlock.x,
      newBlock.y,
      [],
      currentBoard
    )
    if (movingBlocks) {
      currentBoard = this.moveBlocks(movingBlocks, dx, dy, currentBoard)
    } else {
      currentBoard = this.combineBlocks(newBlock, dx, dy, [], currentBoard)
    }
    if (currentBoard) {
      currentBoard = this.updatePlayerOnBoard(
        this.state.playerPosition,
        newBlock,
        currentBoard
      )
      currentBoard = this.clearBoardOfThrees(currentBoard)
      this.setState({
        playerPosition: newBlock,
        currentBoard: currentBoard,
        undoBoard: this.state.currentBoard
      })
    }
  }

  combineBlocks = (blockA, dx, dy, movingBlocks = [], inputArray) => {
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
    return this.combineBlocks(blockB, dx, dy, movingBlocks, inputArray)
  }

  moveBlocks = (array, dx, dy, board) => {
    array.reverse().forEach(block => {
      board[block.y + dy][block.x + dx] = board[block.y][block.x]
    })
    return board
  }

  getMovingBlocks = (oldx, oldy, newx, newy, movingBlocks = [], array) => {
    const dir = {
      dx: newx - oldx,
      dy: newy - oldy
    }
    if (!this.checkBlockExists(newx, newy, array)) return false
    if (this.getBlock(newx, newy, array) === BLOCKS.wall) return false
    if (
      this.getBlock(newx, newy, array) === BLOCKS.floor ||
      this.getBlock(newx, newy, array) === BLOCKS.flash
    )
      return movingBlocks
    movingBlocks = [...movingBlocks, { x: newx, y: newy }]
    return this.getMovingBlocks(
      newx,
      newy,
      newx + dir.dx,
      newy + dir.dy,
      movingBlocks,
      array
    )
  }

  blocksCanCombine = (blockA, blockB) => {
    if (blockA === BLOCKS.floor || blockB === BLOCKS.floor) {
      return false
    }
    if (blockA === BLOCKS.wall || blockB === BLOCKS.wall) {
      return false
    }
    if (blockA === BLOCKS.yellow && blockB === BLOCKS.blue) {
      return BLOCKS.combineGreen
    }
    if (blockA === BLOCKS.blue && blockB === BLOCKS.yellow) {
      return BLOCKS.combineGreen
    }
    if (blockA === BLOCKS.yellow && blockB === BLOCKS.red) {
      return BLOCKS.combineOrange
    }
    if (blockA === BLOCKS.red && blockB === BLOCKS.yellow) {
      return BLOCKS.combineOrange
    }
    if (blockA === BLOCKS.red && blockB === BLOCKS.blue) {
      return BLOCKS.combinePurple
    }
    if (blockA === BLOCKS.blue && blockB === BLOCKS.red) {
      return BLOCKS.combinePurple
    }
    if (blockA === BLOCKS.bomb && blockB !== BLOCKS.wall) {
      return BLOCKS.explode
    }
    if (blockA !== BLOCKS.wall && blockB === BLOCKS.bomb) {
      return BLOCKS.explode
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

  updatePlayerOnBoard = (oldblock, newblock, array) => {
    array = this.changeBlockColor(array, newblock.x, newblock.y, BLOCKS.player)
    array = this.changeBlockColor(array, oldblock.x, oldblock.y, BLOCKS.floor)
    return array
  }

  getPlayerPositionFromBoard = array => {
    let columnIndex = undefined
    let rowIndex = array.findIndex(row =>
      row.find(block => block === BLOCKS.player)
    )
    if (rowIndex) {
      columnIndex = array[rowIndex].findIndex(block => block === BLOCKS.player)
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
        if (block === BLOCKS.bomb) return false
        if (
          this.isSame(nextBlock, block) &&
          this.isSame(nextNextBlock, block)
        ) {
          return true
        }
        if (this.isSame(prevBlock, block) && this.isSame(nextBlock, block)) {
          return true
        }
        if (
          this.isSame(prevBlock, block) &&
          this.isSame(prevPrevBlock, block)
        ) {
          return true
        }
        if (
          this.isSame(downBlock, block) &&
          this.isSame(downDownBlock, block)
        ) {
          return true
        }
        if (this.isSame(upBlock, block) && this.isSame(downBlock, block)) {
          return true
        }
        if (this.isSame(upBlock, block) && this.isSame(upUpBlock, block)) {
          return true
        }
        return false
      })
    })
    return threesArray
  }

  isSame = (blockA, blockB) => {
    if (blockA === blockB) {
      return true
    }
    if (blockA === BLOCKS.green && blockB === BLOCKS.combineGreen) {
      return true
    }
    if (blockA === BLOCKS.combineGreen && blockB === BLOCKS.green) {
      return true
    }
    if (blockA === BLOCKS.purple && blockB === BLOCKS.combinePurple) {
      return true
    }
    if (blockA === BLOCKS.combinePurple && blockB === BLOCKS.purple) {
      return true
    }
    if (blockA === BLOCKS.orange && blockB === BLOCKS.combineOrange) {
      return true
    }
    if (blockA === BLOCKS.combineOrange && blockB === BLOCKS.orange) {
      return true
    }

    return false
  }

  nextLevel = () => {
    this.props.history.push(`/levels`)
    this.props.setUser()
  }

  resetLevel = () => {
    this.setState({
      currentBoard: this.state.originalBoard,
      playerPosition: this.getPlayerPositionFromBoard(this.state.originalBoard),
      undoBoard: this.state.originalBoard
    })
  }

  undoMove = () => {
    this.setState({
      currentBoard: this.state.undoBoard,
      playerPosition: this.getPlayerPositionFromBoard(this.state.undoBoard)
    })
  }

  render() {
    const width = this.state.currentBoard.length * 35
    return (
      <div>
        {this.state.levelWon ? (
          <div style={{ position: "relative" }}>
            <Confetti nextLevel={this.nextLevel} />
            <div className={"board blur"}>
              <h1>{this.state.levelName}</h1>
              <GameBoard
                board={this.state.currentBoard}
                width={width}
                handleBlockClick={this.handleBlockClick}
              />
            </div>
            <Button
              style={{ position: "absolute", top: "50%" }}
              positive={true}
              className="winButton"
              onClick={this.nextLevel}
            >
              LEVEL COMPLETE
            </Button>
          </div>
        ) : (
          <div className={"board"}>
            <div>
              <Button
                size={"small"}
                icon={"close"}
                className={"exitButton"}
                onClick={() => this.props.history.goBack()}
              />
              <h1>{this.state.levelName}</h1>
            </div>
            <GameBoard
              board={this.state.currentBoard}
              width={width}
              handleBlockClick={this.handleBlockClick}
            />
            <div className={"resetButton"}>
              <Button icon="backward" onClick={this.undoMove} />
              <Button icon="fast backward" onClick={this.resetLevel} />
            </div>
          </div>
        )}
      </div>
    )
  }
}
