import React from "react"
import LevelCard from "../components/LevelCard.js"
import { Card } from "semantic-ui-react"

class LevelCardList extends React.Component {
  render() {
    return (
      <div>
        <Card.Group
          itemsPerRow={3}
          centered={true}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "50px",
            width: "1000px"
          }}
        >
          {this.props.levels.map(level => (
            <LevelCard
              key={level.id}
              {...level}
              completed={
                this.props.completedLevelIds
                  ? this.props.completedLevelIds.includes(level.id)
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
