import React from "react"
import GameCell from "../components/GameCell.js"
import { BLOCKCLASSES, controllerColors } from "../concerns/Config.js"

const Controller = props => {
  let convertBoardFromIds = board =>
    board.map(row => row.map(block => BLOCKCLASSES[block]))

  return (
    <div
      className="grid palette"
      style={{ width: controllerColors[0].length * 35 }}
    >
      {convertBoardFromIds(controllerColors).map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <GameCell
            key={1000 * (cellIndex + 1) + 10 * (rowIndex + 1)}
            x={cellIndex}
            y={rowIndex}
            cellColor={cell}
            handleBlockClick={() => props.handleBlockClick(cell)}
          />
        ))
      )}
    </div>
  )
}

export default Controller
