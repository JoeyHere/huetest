import React, { Component } from "react"
import { Button, Form } from "semantic-ui-react"
import { Link } from "react-router-dom"
import API from "../concerns/API.js"

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
        {/* <h1>LOG IN</h1> */}
        <Form
          onSubmit={this.logIn}
          style={{ width: 400 + "px", padding: 20 + "px", margin: "auto" }}
        >
          <Form.Field>
            {/* <label>User Name</label> */}
            <input
              onChange={event =>
                this.setState({ user_name: event.target.value })
              }
              value={this.state.user_name}
              placeholder="User Name"
              name="user_name"
            />
          </Form.Field>
          <Form.Field>
            {/* <label>password</label> */}
            <input
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
            LOG IN
          </Button>
          <Button
            className={"signUpButton"}
            fluid={true}
            as={Link}
            to={"/signup"}
          >
            GO TO SIGN UP
          </Button>
        </Form>
      </div>
    )
  }
}
