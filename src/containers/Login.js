import React, { Component } from "react"
import { Button, Form } from "semantic-ui-react"
import { Link } from "react-router-dom"
import API from "../concerns/API.js"
import GameBoard from "./GameBoard.js"

export default class Login extends Component {
  state = {
    user_name: "",
    password: ""
  }

  logIn = event => {
    event.preventDefault()
    API.loginPost(this.state.user_name, this.state.password).then(
      userObject => {
        if (userObject.token) {
          loginSetUser(userObject)
        } else {
          alert(`Password or Username Incorrect`)
          window.location.reload()
        }
      }
    )
    const loginSetUser = userObject => {
      let token = userObject.token
      localStorage.setItem("token", token)
      this.props.setUser()
      this.props.history.push(`/levels`)
    }
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.history.push(`/levels`)
    }
  }

  render() {
    return (
      <div className="logInForm">
        <GameBoard
          board={[
            [8, 10, 10, 8],
            [10, 1, 2, 10],
            [10, 4, 3, 10],
            [8, 10, 10, 8]
          ]}
          width={4 * 35}
        />
        <h2>LOG IN</h2>
        <Form
          onSubmit={this.logIn}
          style={{ width: 300 + "px", padding: 20 + "px", margin: "auto" }}
        >
          <Form.Field>
            <label style={{ textAlign: "center" }}>Username</label>
            <input
              onChange={event =>
                this.setState({ user_name: event.target.value })
              }
              value={this.state.user_name}
              name="user_name"
            />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: "center" }}>Password</label>
            <input
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              value={this.state.password}
              name="password"
              type="password"
            />
          </Form.Field>
          <div className={"loginButtons"}>
            <Button compact positive={true} id="submitButton" type="submit">
              LOG IN
            </Button>
            <Button compact className={"signUpButton"} as={Link} to={"/signup"}>
              GO TO SIGN UP
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
