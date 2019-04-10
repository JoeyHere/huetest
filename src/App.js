import React from "react"
// import ReactDOM from "react-dom"
import Game from "./containers/Game"
import "./App.css"
import LevelIndex from "./containers/LevelIndex"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import LevelEditor from "./containers/LevelEditor"
import Navbar from "./components/Navbar"
import Login from "./containers/Login"
import API from "./concerns/API.js"
import SignUp from "./containers/SignUp"
import MyLevels from "./containers/MyLevels"

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

  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        return this.state.currentUser ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }}
    />
  )

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
                return (
                  <LevelIndex
                    currentUser={this.state.currentUser}
                    setUser={this.setUser}
                  />
                )
              }}
            />
            <Route
              exact
              path="/"
              component={() => {
                return <LevelIndex currentUser={this.state.currentUser} />
              }}
            />
            <this.PrivateRoute
              currentUser={this.state.currentUser}
              exact
              path="/mylevels"
              component={MyLevels}
            />
            <Route
              path="/levels/:id"
              component={routerProps => {
                return (
                  <Game
                    id={routerProps.match.params.id}
                    {...routerProps}
                    setUser={this.setUser}
                  />
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
            <this.PrivateRoute
              currentUser={this.state.currentUser}
              path="/create"
              component={LevelEditor}
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
            <Route
              exact
              path="/signup"
              component={routerProps => {
                return (
                  <SignUp
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
