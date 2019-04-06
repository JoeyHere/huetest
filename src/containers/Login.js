import React, { Component } from "react"
import { Button, Form } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Login extends Component {
  logIn = event => {
    event.preventDefault()
    API.loginPost(event.target.email.value, event.target.password.value).then(
      userObject => {
        loginSetUser(userObject)
      }
    )
    const loginSetUser = userObject => {
      let token = userObject.token
      localStorage.setItem("token", token)
      this.props.setUser()
    }
  }

  render() {
    return (
      <div id="image-container">
        <div id="myModal" className="modal">
          <div className="modal-content">
            <h1>Login</h1>
            <Form
              onSubmit={this.logIn}
              style={{ width: 20 + "%", padding: 20 + "px", margin: "auto" }}
            >
              <Form.Field>
                <label>User Name</label>
                <input placeholder="User Name" name="user_name" />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder="Password" name="password" />
              </Form.Field>
              <Button className="ui submitbutton centered column" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
