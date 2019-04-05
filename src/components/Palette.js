import React from "react"
import GameCell from "./GameCell.js"
import { BLOCKS, BLOCKCLASSES, paletteColors } from "../concerns/Config.js"

const Palette = props => {
  let convertBoardFromIds = board =>
    board.map(row => row.map(block => BLOCKCLASSES[block]))

  return (
    <div
      className="grid palette"
      style={{ width: paletteColors[0].length * 35 }}
    >
      {convertBoardFromIds(paletteColors).map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <GameCell
            key={1000 * (cellIndex + 1) + 10 * (rowIndex + 1)}
            x={cellIndex}
            y={rowIndex}
            cellColor={cell}
            selected={props.selectedBlock === BLOCKS[cell] ? true : false}
            handleBlockClick={() => props.handleBlockClick(cell)}
          />
        ))
      )}
    </div>
  )
}

export default Palette
