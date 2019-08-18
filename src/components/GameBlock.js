import React from "react"

const GameBlock = props => {
  let className = props.blockColor + " block"

  if (props.selected) {
    className = className + " selectedBlock"
  }

  return (
    <div
      x={props.x}
      y={props.y}
      className={className}
      onClick={event => {
        event.preventDefault()
        props.handleBlockClick()
      }}
    />
  )
}

export default GameBlock
