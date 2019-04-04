import React from "react"

const GameCell = props => {
  let className = props.cellColor + " cell"

  if (props.selected) {
    className = className + " selected"
  }

  return (
    <div
      x={props.x}
      y={props.y}
      className={className}
      onClick={props.handleBlockClick}
    />
  )
}

export default GameCell
