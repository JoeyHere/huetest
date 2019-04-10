import React, { Component } from "react"
import { Button, Form } from "semantic-ui-react"
import API from "../concerns/API.js"

export default class SignUp extends Component {
  state = {
    user_name: "",
    password: "",
    password_confirmed: ""
  }

  signUp = event => {
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

  render() {
    return (
      <div className="logInForm">
        <h1>SIGN UP</h1>
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
          <Button
            positive={true}
            fluid={true}
            className="ui submitbutton"
            type="submit"
          >
            SUBMIT
          </Button>
        </Form>
      </div>
    )
  }
}
