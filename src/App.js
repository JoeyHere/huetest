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
        "blue",
        "lightgrey",
        "blue",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "lightgrey",
        "darkgrey"
      ],
      [
        "darkgrey",
        "blue",
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
