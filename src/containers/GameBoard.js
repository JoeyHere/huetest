import React from "react"
import GameCell from "../components/GameCell.js"
import { BLOCKCLASSES } from "../concerns/Config.js"

const GameBoard = props => {
  let convertBoardFromIds = board =>
    board.map(row => row.map(block => BLOCKCLASSES[block]))
  return (
    <div className="grid" style={{ width: props.width }}>
      {convertBoardFromIds(props.board).map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <GameCell
            key={1000 * (cellIndex + 1) + 10 * (rowIndex + 1)}
            x={cellIndex}
            y={rowIndex}
            cellColor={cell}
            handleBlockClick={() => props.handleBlockClick(cellIndex, rowIndex)}
          />
        ))
      )}
    </div>
  )
}

export default GameBoard
