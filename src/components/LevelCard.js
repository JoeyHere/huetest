import React from "react"
import { Card } from "semantic-ui-react"
import { Link } from "react-router-dom"

class LevelCard extends React.Component {
  render() {
    return (
      <Card as={Link} to={`/levels/${this.props.id}`}>
        <Card.Content header={this.props.name} />
      </Card>
    )
  }
}

export default LevelCard
