import React from "react"
import GameCell from "../components/GameCell.js"

const BLOCKCLASSES = {
  1: "white",
  2: "red",
  3: "blue",
  4: "yellow",
  5: "green",
  6: "purple",
  7: "orange",
  8: "brown",
  9: "darkgrey",
  10: "lightgrey",
  11: "flash"
}

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
          />
        ))
      )}
    </div>
  )
}

export default GameBoard
