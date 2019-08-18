import React from "react"
import LevelCardList from "../containers/LevelCardList.js"
import API from "../concerns/API.js"
import DropDownFilter from "../components/DropDownFilter.js"
import { Checkbox, Segment } from "semantic-ui-react"

class LevelIndex extends React.Component {
  state = {
    levels: [],
    loading: true
  }

  componentDidMount() {
    API.getLevels().then(levels =>
      this.setState({
        levels: levels,
        loading: false
      })
    )
  }

  filterLevels = () => {
    let levels = []
    switch (this.props.filterState) {
      case "Tutorial":
        levels = this.state.levels.filter(level => {
          return (
            level.name.includes("Tutorial") && level.user.user_name === "HUEman"
          )
        })
        break
      case "HUEman":
        levels = this.state.levels.filter(level => {
          return (
            !level.name.includes("Tutorial") &&
            level.user.user_name === "HUEman"
          )
        })
        break
      case "Hard":
        levels = this.state.levels.filter(level => {
          return (
            level.completes / level.plays <= 0.3 &&
            !level.name.includes("Tutorial")
          )
        })
        break
      case "Easy":
        levels = this.state.levels.filter(level => {
          return (
            level.completes / level.plays > 0.3 &&
            !level.name.includes("Tutorial")
          )
        })
        break
      default:
        levels = this.state.levels
    }

    if (this.props.toggleComplete === true) {
      levels = levels.filter(level => {
        return (
          this.props.currentUser &&
          !this.props.currentUser.completedLevelIds.includes(level.id) &&
          this.props.currentUser.id !== level.user.id
        )
      })
    }

    if (levels.length > 0) {
      return levels
    } else {
      return this.state.levels
    }
  }

  orderLevels = array => {
    let newArray = [...array]
    switch (this.props.orderState) {
      case "Popular":
        newArray.sort(
          (a, b) =>
            b.plays * (b.upvotes - b.downvotes + 1) -
            a.plays * (a.upvotes - a.downvotes + 1)
        )
        break
      case "New":
        newArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        break
      default:
        newArray = array
    }
    return newArray
  }

  handleLevelClick = levelId => {
    this.props.history.push(`/levels/${levelId}`)
  }

  handlePublishedClick = levelId => {
    this.props.history.push(`/levels/${levelId}`)
  }

  render() {
    return (
      <div id="index-div">
        <Segment style={{ padding: "0px" }} basic>
          <Checkbox
            style={{ padding: "0px" }}
            className={"toggleLevels"}
            label={"Hide Completed"}
            checked={this.props.toggleComplete}
            onChange={this.props.handleToggleChange}
          />
          <DropDownFilter
            handleFilterChange={this.props.handleFilterChange}
            filterState={this.props.filterState}
            handleOrderChange={this.props.handleOrderChange}
            orderState={this.props.orderState}
          />
        </Segment>
        <LevelCardList
          handleLevelClick={this.handleLevelClick}
          handlePublishedClick={this.handlePublishedClick}
          levels={this.orderLevels(this.filterLevels())}
          loading={this.state.loading}
          currentUserId={this.props.currentUser ? this.props.currentUser.id : 0}
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
