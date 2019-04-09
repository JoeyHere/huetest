import React from "react"
import { Button } from "semantic-ui-react"

const Confetti = props => {
  return (
    <div className="confetti">
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <Button positive={true} className="icon" onClick={props.nextLevel}>
        LEVEL COMPLETE
      </Button>
    </div>
  )
}

export default Confetti
