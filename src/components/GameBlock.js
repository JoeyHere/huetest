import React from "react"

const GameBlock = props => {
  let className = props.blockColor + " block"

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

export default GameBlock
