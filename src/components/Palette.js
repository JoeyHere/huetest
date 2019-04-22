import React from "react"
import GameBlock from "./GameBlock.js"
import { BLOCKCLASSES, paletteColors } from "../concerns/Config.js"

const Palette = props => {
  return (
    <div
      className="grid palette"
      style={{ width: paletteColors[0].length * 35 }}
    >
      {paletteColors.map((row, rowIndex) =>
        row.map((block, blockIndex) => (
          <GameBlock
            key={1000 * (blockIndex + 1) + 10 * (rowIndex + 1)}
            x={blockIndex}
            y={rowIndex}
            blockColor={BLOCKCLASSES[block]}
            selected={props.selectedBlock === block ? true : false}
            handleBlockClick={() => props.handleBlockClick(block)}
          />
        ))
      )}
    </div>
  )
}

export default Palette
