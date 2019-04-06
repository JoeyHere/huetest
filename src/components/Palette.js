import React from "react"
import GameBlock from "./GameBlock.js"
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
        row.map((block, blockIndex) => (
          <GameBlock
            key={1000 * (blockIndex + 1) + 10 * (rowIndex + 1)}
            x={blockIndex}
            y={rowIndex}
            blockColor={block}
            selected={props.selectedBlock === BLOCKS[block] ? true : false}
            handleBlockClick={() => props.handleBlockClick(block)}
          />
        ))
      )}
    </div>
  )
}

export default Palette
