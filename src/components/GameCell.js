import React from "react"

const GameCell = props => {
  let className = props.cellColor + " cell"
  return <div className={className} />
}

export default GameCell
