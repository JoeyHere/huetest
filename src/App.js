import React from "react"
// import ReactDOM from "react-dom"
import Game from "./containers/Game"
import LevilEditor from "./containers/LevelEditor"
import "./App.css"

class App extends React.Component {
  state = {
    levelEditor: false,
    levelBoard: [
      [10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10],
      [10, 9, 9, 10, 10, 5, 5, 9, 10, 10, 10, 10],
      [10, 9, 8, 10, 10, 10, 10, 9, 10, 10, 10, 10],
      [10, 9, 8, 10, 10, 10, 4, 9, 4, 10, 10, 10],
      [10, 9, 8, 3, 10, 5, 10, 9, 10, 10, 10, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 3, 10, 5, 10, 9, 5, 5, 10, 10],
      [10, 9, 9, 10, 10, 10, 10, 9, 10, 10, 10, 10],
      [10, 9, 9, 4, 9, 10, 4, 9, 4, 10, 10, 10],
      [10, 9, 9, 3, 9, 9, 9, 9, 9, 9, 9, 10],
      [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 10],
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    ]
  }

  handleSave = board =>
    this.setState({
      levelBoard: board
    })

  tryLevel = () => {
    this.setState({
      levelEditor: !this.state.levelEditor
    })
  }

  render() {
    return (
      <div>
        {this.state.levelEditor ? (
          <LevilEditor
            board={this.state.levelBoard}
            handleSave={this.handleSave}
            tryLevel={this.tryLevel}
          />
        ) : (
          <Game board={this.state.levelBoard} />
        )}
        <button onClick={this.tryLevel}>
          {this.state.levelEditor ? "Test Level" : "Edit Level"}
        </button>
      </div>
    )
  }
}

export default App
