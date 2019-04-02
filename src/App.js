import React from "react"
// import ReactDOM from "react-dom"
import Game from "./containers/Game"
import "./App.css"

class App extends React.Component {
  state = {
    levelBoard: [
      [
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "lightgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" }
      ],
      [
        { color: "darkgrey" },
        { color: "blue" },
        { color: "lightgrey" },
        { color: "blue" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "darkgrey" }
      ],
      [
        { color: "darkgrey" },
        { color: "blue" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "darkgrey" }
      ],
      [
        { color: "darkgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "darkgrey" }
      ],
      [
        { color: "darkgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "blue" },
        { color: "blue" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "darkgrey" }
      ],
      [
        { color: "darkgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "darkgrey" }
      ],
      [
        { color: "darkgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "lightgrey" },
        { color: "white" },
        { color: "darkgrey" }
      ],

      [
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" },
        { color: "darkgrey" }
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
