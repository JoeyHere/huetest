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
import GameBoard from "./containers/GameBoard"
import ReactGA from "react-ga"
import AboutPage from "./containers/AboutPage"
import Footer from "./containers/Footer"
ReactGA.initialize("UA-143157687-1")
ReactGA.pageview(window.location.pathname + window.location.search)

class App extends React.Component {
  state = {
    currentUser: undefined,
    filterLevel: "All",
    orderLevel: "Popular",
    toggleComplete: false,
    mute: false
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

  handleFilterChange = (event, data) => {
    this.setState({
      filterLevel: data.value
    })
  }

  handleOrderChange = (event, data) => {
    this.setState({
      orderLevel: data.value
    })
  }

  handleToggleChange = (event, data) => {
    this.setState({
      toggleComplete: data.checked
    })
  }

  muteGame = boolean => {
    this.setState({ mute: boolean })
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
      <div className="allApp">
        <Router>
          <Navbar currentUser={this.state.currentUser} logOut={this.logOut} />
          <Switch>
            <Route
              exact
              path="/levels"
              component={routerProps => {
                return (
                  <LevelIndex
                    handleFilterChange={this.handleFilterChange}
                    filterState={this.state.filterLevel}
                    handleOrderChange={this.handleOrderChange}
                    handleToggleChange={this.handleToggleChange}
                    toggleComplete={this.state.toggleComplete}
                    orderState={this.state.orderLevel}
                    currentUser={this.state.currentUser}
                    setUser={this.setUser}
                    {...routerProps}
                  />
                )
              }}
            />
            <Route
              exact
              path="/"
              component={routerProps => {
                return (
                  <LevelIndex
                    handleFilterChange={this.handleFilterChange}
                    filterState={this.state.filterLevel}
                    handleOrderChange={this.handleOrderChange}
                    handleToggleChange={this.handleToggleChange}
                    toggleComplete={this.state.toggleComplete}
                    orderState={this.state.orderLevel}
                    currentUser={this.state.currentUser}
                    setUser={this.setUser}
                    {...routerProps}
                  />
                )
              }}
            />
            <Route
              exact
              path="/about"
              component={routerProps => {
                return <AboutPage {...routerProps} />
              }}
            />
            <this.PrivateRoute
              currentUser={this.state.currentUser}
              exact
              path="/mylevels"
              component={MyLevels}
            />
            <Route
              exact
              path="/levels/:id"
              component={routerProps => {
                return (
                  <Game
                    id={routerProps.match.params.id}
                    {...routerProps}
                    setUser={this.setUser}
                    mute={this.state.mute}
                    currentUser={this.state.currentUser}
                    muteGame={this.muteGame}
                  />
                )
              }}
            />
            <this.PrivateRoute
              currentUser={this.state.currentUser}
              exact
              path="/create"
              component={LevelEditor}
            />
            <this.PrivateRoute
              path="/create/:id/edit"
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
            <>
              <GameBoard
                board={[
                  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                  [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
                  [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
                  [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
                  [10, 9, 9, 8, 9, 9, 15, 15, 9, 9, 9, 8, 9, 10],
                  [10, 9, 8, 8, 9, 15, 9, 9, 15, 9, 8, 8, 9, 10],
                  [10, 8, 9, 8, 9, 15, 9, 9, 15, 8, 9, 8, 9, 10],
                  [10, 8, 8, 8, 8, 15, 9, 9, 15, 8, 8, 8, 8, 10],
                  [10, 9, 9, 8, 9, 9, 15, 15, 9, 9, 9, 8, 9, 10],
                  [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
                  [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
                  [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
                  [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
                  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
                ]}
                width={14 * 35}
              />
            </>
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

export default App
