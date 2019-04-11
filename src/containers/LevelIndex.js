import React from "react"
import LevelCardList from "../containers/LevelCardList.js"
import API from "../concerns/API.js"
import DropDownFilter from "../components/DropDownFilter.js"

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
      case "Easy":
        levels = this.state.levels
      default:
        levels = this.state.levels
    }
    if (levels.length > 0) {
      return levels
    } else {
      return this.state.levels
    }
  }

  handleLevelClick = levelId => {
    this.props.history.push(`/levels/${levelId}`)
  }

  render() {
    return (
      <div id="index-div">
        <DropDownFilter
          handleFilterChange={this.props.handleFilterChange}
          filterState={this.props.filterState}
          handleOrderChange={this.props.handleOrderChange}
          orderState={this.props.orderState}
        />
        <LevelCardList
          handleLevelClick={this.handleLevelClick}
          levels={this.filterLevels()}
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
