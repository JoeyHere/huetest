import React from "react"
// import ReactDOM from "react-dom"
import Game from "./containers/Game"
import "./App.css"
import LevelIndex from "./containers/LevelIndex"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LevelEditor from "./containers/LevelEditor"
import Navbar from "./components/Navbar"
import Login from "./containers/Login"
import API from "./concerns/API.js"

class App extends React.Component {
  state = {
    currentUser: undefined
  }

  componentDidMount() {
    this.setUser()
  }

  setUser = () => {
    API.getProfile().then(userObject => {
      if (userObject.error) {
        console.log(userObject.error)
      } else {
        this.setState({ currentUser: userObject.user })
      }
    })
  }

  logOut = () => {
    localStorage.removeItem("token")
    this.setState({
      currentUser: undefined
    })
    window.location.reload()
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar currentUser={this.state.currentUser} logOut={this.logOut} />
          <Switch>
            <Route
              exact
              path="/levels"
              component={() => {
                return <LevelIndex currentUser={this.state.currentUser} />
              }}
            />
            <Route
              path="/levels/:id"
              component={routerProps => {
                return (
                  <Game id={routerProps.match.params.id} {...routerProps} />
                )
              }}
            />
            <Route
              path="/edit/:id"
              component={routerProps => {
                return (
                  <LevelEditor
                    id={routerProps.match.params.id}
                    {...routerProps}
                  />
                )
              }}
            />
            <Route
              exact
              path="/create"
              component={routerProps => {
                return (
                  <LevelEditor
                    {...routerProps}
                    currentUser={this.state.currentUser}
                  />
                )
              }}
            />
            <Route
              exact
              path="/login"
              component={routerProps => {
                return (
                  <Login
                    {...routerProps}
                    setUser={this.setUser}
                    currentUser={this.state.currentUser}
                  />
                )
              }}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
