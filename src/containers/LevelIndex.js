import React from "react"
import LevelCardList from "../containers/LevelCardList.js"

const API = "http://localhost:3000/levels"

class LevelIndex extends React.Component {
  state = {
    levels: []
  }

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(levels =>
        this.setState({
          levels: levels
        })
      )
  }

  render() {
    return (
      <div id="index-div">
        <LevelCardList levels={this.state.levels} hello={"hello"} />
      </div>
    )
  }
}

export default LevelIndex
