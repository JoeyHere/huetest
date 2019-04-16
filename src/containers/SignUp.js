import React, { Component } from "react"
import { Button, Form } from "semantic-ui-react"
import API from "../concerns/API.js"
import { Link } from "react-router-dom"
import GameBoard from "./GameBoard"

export default class SignUp extends Component {
  state = {
    user_name: "",
    password: "",
    confirm: ""
  }

  signUp = event => {
    if (this.state.password === this.state.confirm) {
      event.preventDefault()
      API.signUpPost(this.state.user_name, this.state.password).then(
        userObject => {
          if (userObject) {
            loginSetUser(userObject)
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
        <h2>SIGN UP</h2>
        <Form
          onSubmit={this.signUp}
          style={{ width: 300 + "px", padding: 20 + "px", margin: "auto" }}
        >
          <Form.Field>
            <label style={{ textAlign: "center" }}>Username</label>
            <input
              maxLength="20"
              onChange={event =>
                this.setState({ user_name: event.target.value })
              }
              value={this.state.user_name}
              // placeholder="User Name"
              name="user_name"
            />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: "center" }}>Password</label>
            <input
              maxLength="30"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              value={this.state.password}
              // placeholder="Password"
              name="password"
              type="password"
            />
          </Form.Field>
          <Form.Field>
            <label style={{ textAlign: "center" }}>Confirm Password</label>
            <input
              maxLength="30"
              onChange={event => this.setState({ confirm: event.target.value })}
              value={this.state.confirm}
              // placeholder="Confirm Password"
              name="confirm"
              type="password"
            />
          </Form.Field>
          <div className={"loginButtons"}>
            <Button positive={true} id="submitButton" type="submit">
              SIGN UP
            </Button>
            <Button className={"signUpButton"} as={Link} to={"/login"}>
              GO TO LOG IN
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
