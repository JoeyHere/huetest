import React from "react"
import LevelCardList from "../containers/LevelCardList.js"
import API from "../concerns/API.js"
import { Button, Icon } from "semantic-ui-react"

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

  handlePublishedClick = levelId => {
    this.props.history.push(`/levels/${levelId}`)
  }

  render() {
    return (
      <div id="index-div">
        <LevelCardList
          handleLevelClick={this.handleLevelClick}
          handlePublishedClick={this.handlePublishedClick}
          levels={this.state.levels}
          currentUserId={this.props.currentUser ? this.props.currentUser.id : 0}
          completedLevelIds={
            this.props.currentUser
              ? this.props.currentUser.completedLevelIds
              : []
          }
        />
        <h3>
          {this.state.levels.length === 0 ? (
            <>
              <p>you haven't created any levels yet...</p>
              <Button
                compact
                onClick={() => this.props.history.push(`/create`)}
              >
                <Icon name="paint brush" /> Create
              </Button>
            </>
          ) : null}
        </h3>
      </div>
    )
  }
}

export default MyLevels
