import React from "react"
// import ReactDOM from "react-dom"
import Game from "./containers/Game"
import "./App.css"

class App extends React.Component {
  state = {
    levelBoard: [
      [
        "darkgrey",
        "darkgrey",
        "lightgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey"
      ],
      [
        "darkgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "darkgrey"
      ],
      [
        "darkgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "darkgrey"
      ],
      [
        "darkgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "green",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "darkgrey"
      ],
      [
        "darkgrey",
        "lightgrey",
        "lightgrey",
        "blue",
        "yellow",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "darkgrey"
      ],
      [
        "darkgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "darkgrey"
      ],
      [
        "darkgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "darkgrey"
      ],
      [
        "darkgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "darkgrey"
      ],
      [
        "darkgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "white",
        "darkgrey"
      ],

      [
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey",
        "darkgrey"
      ]
    ]
  }

  render() {
    return (
      <div>
        <Game board={this.state.levelBoard} />
      </div>
    )
  }
}

export default App
