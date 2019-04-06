import React from "react"
import LevelCardList from "../containers/LevelCardList.js"
import API from "../concerns/API.js"

class LevelIndex extends React.Component {
  state = {
    levels: []
  }

  componentDidMount() {
    API.getLevels().then(levels =>
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
