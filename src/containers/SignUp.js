import React, { Component } from "react"
import { Button, Form } from "semantic-ui-react"
import API from "../concerns/API.js"
import { Link } from "react-router-dom"

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
        <h2>SIGN UP</h2>
        <Form
          onSubmit={this.signUp}
          style={{ width: 400 + "px", padding: 20 + "px", margin: "auto" }}
        >
          <Form.Field>
            {/* <label>User Name</label> */}
            <input
              maxLength="20"
              onChange={event =>
                this.setState({ user_name: event.target.value })
              }
              value={this.state.user_name}
              placeholder="User Name"
              name="user_name"
            />
          </Form.Field>
          <Form.Field>
            {/* <label>Password</label> */}
            <input
              maxLength="30"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              value={this.state.password}
              placeholder="Password"
              name="password"
              type="password"
            />
          </Form.Field>
          <Form.Field>
            {/* <label>Password</label> */}
            <input
              maxLength="30"
              onChange={event => this.setState({ confirm: event.target.value })}
              value={this.state.confirm}
              placeholder="Confirm Password"
              name="confirm"
              type="password"
            />
          </Form.Field>
          <Button
            positive={true}
            fluid={true}
            className="ui submitbutton"
            type="submit"
          >
            SIGN UP
          </Button>
          <Button
            className={"signUpButton"}
            fluid={true}
            as={Link}
            to={"/login"}
          >
            GO TO LOG IN
          </Button>
        </Form>
      </div>
    )
  }
}
