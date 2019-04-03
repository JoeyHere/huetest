import React from "react"
// import ReactDOM from "react-dom"
import Game from "./containers/Game"
import "./App.css"

class App extends React.Component {
  state = {
    levelBoard: [
      [9, 9, 9, 9, 9, 9, 10, 9, 9, 9, 9, 9],
      [9, 10, 5, 3, 7, 5, 7, 2, 5, 3, 10, 9],
      [9, 10, 2, 5, 3, 7, 6, 5, 7, 6, 10, 9],
      [9, 10, 9, 9, 9, 9, 10, 9, 9, 9, 10, 9],
      [9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9],
      [9, 10, 10, 4, 10, 10, 10, 3, 10, 10, 9, 9],
      [9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 6, 9],
      [9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 6, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 9],
      [9, 10, 5, 2, 3, 7, 2, 3, 10, 10, 10, 9],
      [9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
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
