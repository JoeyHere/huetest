import React from "react"
import LevelCard from "../components/LevelCard.js"
import { Card } from "semantic-ui-react"

class LevelCardList extends React.Component {
  render() {
    return (
      <div>
        <div style={{ paddingBottom: 5 + "px", paddingTop: 5 + "px" }} />
        <div>
          <Card.Group
            style={{
              marginLeft: 10 + "px",
              marginRight: 10 + "px",
              marginTop: 5 + "px"
            }}
          >
            {this.props.levels.map(level => (
              <LevelCard key={level.id} {...level} />
            ))}
          </Card.Group>
        </div>
      </div>
    )
  }
}

export default LevelCardList
