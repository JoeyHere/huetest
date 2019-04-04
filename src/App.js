import React from "react"
// import ReactDOM from "react-dom"
import Game from "./containers/Game"
import "./App.css"
import LevelIndex from "./containers/LevelIndex"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LevelEditor from "./containers/LevelEditor"

class App extends React.Component {
  state = {
    savedBoard: []
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
        <Router>
          <Switch>
            <Route exact path="/levels" component={LevelIndex} />

            <Route
              path="/levels/:id"
              component={routerProps => {
                return (
                  <Game id={routerProps.match.params.id} {...routerProps} />
                )
              }}
            />

            <Route exact path="/create" component={LevelEditor} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
