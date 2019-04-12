import React from "react"
import LevelCardList from "../containers/LevelCardList.js"
import API from "../concerns/API.js"
import DropDownFilter from "../components/DropDownFilter.js"
import { Checkbox } from "semantic-ui-react"

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
          !this.props.currentUser.completedLevelIds.includes(level.id)
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
        newArray.sort((a, b) => b.plays - a.plays)
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
        <Checkbox
          className={"toggleLevels"}
          label={"Hide Completed"}
          checked={this.props.toggleComplete}
          onChange={this.props.handleToggleChange}
          // toggle
        />
        <DropDownFilter
          handleFilterChange={this.props.handleFilterChange}
          filterState={this.props.filterState}
          handleOrderChange={this.props.handleOrderChange}
          orderState={this.props.orderState}
        />
        <LevelCardList
          handleLevelClick={this.handleLevelClick}
          handlePublishedClick={this.handlePublishedClick}
          levels={this.orderLevels(this.filterLevels())}
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
