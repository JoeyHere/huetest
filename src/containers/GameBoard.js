import React from "react"
import GameBlock from "../components/GameBlock.js"
import { BLOCKCLASSES } from "../concerns/Config.js"

const GameBoard = props => {
  let convertBoardFromIds = board =>
    board.map(row => row.map(block => BLOCKCLASSES[block]))
  return (
    <div className="grid" style={{ width: props.width }}>
      {convertBoardFromIds(props.board).map((row, rowIndex) =>
        row.map((block, blockIndex) => (
          <GameBlock
            key={1000 * (blockIndex + 1) + 10 * (rowIndex + 1)}
            x={blockIndex}
            y={rowIndex}
            blockColor={block}
            handleBlockClick={event =>
              props.handleBlockClick
                ? props.handleBlockClick(blockIndex, rowIndex, props.width / 35)
                : () => null
            }
          />
        ))
      )}
    </div>
  )
}

export default GameBoard
