import React from "react"
import GameCell from "../components/GameCell.js"

const GameBoard = props => (
  <div className="grid" style={{ width: props.width }}>
    {props.board.map((row, rowIndex) =>
      row.map((cell, cellIndex) => (
        <GameCell
          key={1000 * (cellIndex + 1) + 10 * (rowIndex + 1)}
          x={cellIndex}
          y={rowIndex}
          cellColor={cell}
        />
      ))
    )}
  </div>
)

export default GameBoard
