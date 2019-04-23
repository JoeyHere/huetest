import { BLOCKS } from "../concerns/Config.js"

export const isSameBlock = (blockA, blockB) => {
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

export const blocksCanCombine = (blockA, blockB) => {
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

export const removeFlashBlocks = array => {
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

export const getBlockFromBoard = (x, y, array) => array[y][x]

export const checkBlockExists = (x, y, array) => array[y] && array[y][x]

export const checkArrayForThrees = inputArray => {
  let threesArray = inputArray.map((row, yi, array) => {
    return row.map((block, i) => {
      let prevBlock = checkBlockExists(i - 1, yi, array)
        ? getBlockFromBoard(i - 1, yi, array)
        : undefined
      let prevPrevBlock = checkBlockExists(i - 2, yi, array)
        ? getBlockFromBoard(i - 2, yi, array)
        : undefined
      let nextBlock = checkBlockExists(i + 1, yi, array)
        ? getBlockFromBoard(i + 1, yi, array)
        : undefined
      let nextNextBlock = checkBlockExists(i + 2, yi, array)
        ? getBlockFromBoard(i + 2, yi, array)
        : undefined
      let downBlock = checkBlockExists(i, yi + 1, array)
        ? getBlockFromBoard(i, yi + 1, array)
        : undefined
      let downDownBlock = checkBlockExists(i, yi + 2, array)
        ? getBlockFromBoard(i, yi + 2, array)
        : undefined
      let upBlock = checkBlockExists(i, yi - 1, array)
        ? getBlockFromBoard(i, yi - 1, array)
        : undefined
      let upUpBlock = checkBlockExists(i, yi - 2, array)
        ? getBlockFromBoard(i, yi - 2, array)
        : undefined
      if (block === BLOCKS.wall) return false
      if (block === BLOCKS.floor) return false
      if (block === BLOCKS.brown) return false
      if (block === BLOCKS.bomb) return false
      if (isSameBlock(nextBlock, block) && isSameBlock(nextNextBlock, block)) {
        return true
      }
      if (isSameBlock(prevBlock, block) && isSameBlock(nextBlock, block)) {
        return true
      }
      if (isSameBlock(prevBlock, block) && isSameBlock(prevPrevBlock, block)) {
        return true
      }
      if (isSameBlock(downBlock, block) && isSameBlock(downDownBlock, block)) {
        return true
      }
      if (isSameBlock(upBlock, block) && isSameBlock(downBlock, block)) {
        return true
      }
      if (isSameBlock(upBlock, block) && isSameBlock(upUpBlock, block)) {
        return true
      }
      return false
    })
  })
  return threesArray
}

export const moveBlocks = (array, dx, dy, board) => {
  array.reverse().forEach(block => {
    board[block.y + dy][block.x + dx] = board[block.y][block.x]
  })
  return board
}

export const getMovingBlocks = (
  oldBlock,
  newBlock,
  board,
  movingBlocks = []
) => {
  const dir = {
    dx: newBlock.x - oldBlock.x,
    dy: newBlock.y - oldBlock.y
  }
  if (!checkBlockExists(newBlock.x, newBlock.y, board)) return false
  if (getBlockFromBoard(newBlock.x, newBlock.y, board) === BLOCKS.wall)
    return false
  if (
    getBlockFromBoard(newBlock.x, newBlock.y, board) === BLOCKS.floor ||
    getBlockFromBoard(newBlock.x, newBlock.y, board) === BLOCKS.flash
  )
    return movingBlocks
  movingBlocks = [...movingBlocks, { x: newBlock.x, y: newBlock.y }]
  oldBlock = newBlock
  newBlock = { x: newBlock.x + dir.dx, y: newBlock.y + dir.dy }
  return getMovingBlocks(oldBlock, newBlock, board, movingBlocks)
}

export const combineBlocks = (
  blockA,
  dx,
  dy,
  movingBlocks = [],
  inputArray
) => {
  let blockB = { x: blockA.x + dx, y: blockA.y + dy }

  if (!checkBlockExists(blockA.x, blockA.y, inputArray)) {
    return false
  }
  if (!checkBlockExists(blockB.x, blockB.y, inputArray)) {
    return false
  }
  if (getBlockFromBoard(blockA.x, blockA.y, inputArray) === BLOCKS.wall) {
    return false
  }
  if (getBlockFromBoard(blockB.x, blockB.y, inputArray) === BLOCKS.wall) {
    return false
  }

  if (
    blocksCanCombine(
      getBlockFromBoard(blockA.x, blockA.y, inputArray),
      getBlockFromBoard(blockB.x, blockB.y, inputArray)
    )
  ) {
    let color = blocksCanCombine(
      getBlockFromBoard(blockA.x, blockA.y, inputArray),
      getBlockFromBoard(blockB.x, blockB.y, inputArray)
    )
    movingBlocks = [...movingBlocks, { x: blockA.x, y: blockA.y }]
    let newArray = moveBlocks(movingBlocks, dx, dy, inputArray)
    newArray[blockB.y][blockB.x] = color
    return newArray
  } else {
    movingBlocks = [...movingBlocks, { x: blockA.x, y: blockA.y }]
  }
  return combineBlocks(blockB, dx, dy, movingBlocks, inputArray)
}

export const updatePlayerOnBoard = (oldblock, newblock, array) => {
  array[newblock.y][newblock.x] = BLOCKS.player
  array[oldblock.y][oldblock.x] = BLOCKS.floor
  return array
}

export const getPlayerPositionFromBoard = array => {
  let columnIndex = undefined
  let rowIndex = array.findIndex(row =>
    row.find(block => block === BLOCKS.player)
  )
  if (rowIndex || rowIndex === 0) {
    columnIndex = array[rowIndex].findIndex(block => block === BLOCKS.player)
  }
  return { x: columnIndex, y: rowIndex }
}

export const clearBoardOfThrees = inputArray => {
  let threesArray = checkArrayForThrees(inputArray)

  let newArray = inputArray.map((row, rowi) => {
    return row.map((block, columni) =>
      threesArray[rowi][columni] ? BLOCKS.flash : block
    )
  })
  return newArray
}
