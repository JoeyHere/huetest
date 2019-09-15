import React from "react"
import LevelCardList from "../containers/LevelCardList.js"
import API from "../concerns/API.js"
import { Button, Icon } from "semantic-ui-react"

class MyLevels extends React.Component {
  state = {
    levels: [],
    loading: true
  }

  componentDidMount() {
    API.getMyLevels().then(levels =>
      this.setState({
        levels: levels,
        loading: false
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
          loading={this.state.loading}
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
              <p style={{ marginTop: "40px" }}>
                You haven't created any levels yet...
              </p>
              <Button
                style={{ marginTop: "10px" }}
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
