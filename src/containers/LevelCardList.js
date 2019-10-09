import React from "react"
import LevelCard from "../components/LevelCard.js"
import { Card, Dimmer, Loader } from "semantic-ui-react"

class LevelCardList extends React.Component {
  render() {
    return (
      <div>
        <Dimmer
          style={{ height: "100vh" }}
          inverted
          active={this.props.loading}
        >
          <Loader size="large" />
        </Dimmer>
        <Card.Group
          itemsPerRow={4}
          centered={true}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "0px",
            paddingRight: "10%",
            paddingLeft: "10%",
            width: "auto"
          }}
        >
          {this.props.levels.map(level => (
            <LevelCard
              handleLevelClick={
                level.published
                  ? this.props.handlePublishedClick
                  : this.props.handleLevelClick
              }
              key={level.id}
              {...level}
              completed={
                this.props.completedLevelIds
                  ? this.props.completedLevelIds.includes(level.id)
                  : false
              }
              userPublished={
                this.props.currentUserId === level.user.id && level.published
                  ? true
                  : false
              }
            />
          ))}
        </Card.Group>
      </div>
    )
  }
}

export default LevelCardList
