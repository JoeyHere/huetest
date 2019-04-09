import React from "react"
import LevelCardList from "../containers/LevelCardList.js"
import API from "../concerns/API.js"
import DropdownFilter from "../components/DropdownFilter.js"

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
        <h3>
          {!this.props.currentUser ? "log in to track your progress" : null}
        </h3>
        <DropdownFilter />
        <LevelCardList
          levels={this.state.levels}
          completedLevelIds={
            this.props.currentUser
              ? this.props.currentUser.completedLevelIds
              : []
          }
        />
      </div>
    )
  }
}

export default LevelIndex
