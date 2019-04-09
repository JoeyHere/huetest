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

  render() {
    return (
      <div id="index-div">
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

export default MyLevels
