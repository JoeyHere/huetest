import React from "react"
import LevelCardList from "../containers/LevelCardList.js"
import API from "../concerns/API.js"

class MyLevels extends React.Component {
  state = {
    levels: []
  }

  componentDidMount() {
    API.getMyLevels().then(levels =>
      this.setState({
        levels: levels
      })
    )
  }

  handleLevelClick = levelId => {
    this.props.history.push(`/create/${levelId}/edit`)
  }

  render() {
    return (
      <div id="index-div">
        <LevelCardList
          handleLevelClick={this.handleLevelClick}
          levels={this.state.levels}
          completedLevelIds={
            this.props.currentUser
              ? this.props.currentUser.completedLevelIds
              : []
          }
        />
        <h3>
          {this.state.levels.length === 0
            ? "you haven't created any levels yet...."
            : null}
        </h3>
      </div>
    )
  }
}

export default MyLevels
