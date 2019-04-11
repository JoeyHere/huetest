import React from "react"
import LevelCardList from "../containers/LevelCardList.js"
import API from "../concerns/API.js"
import DropDownFilter from "../components/DropDownFilter.js"

class LevelIndex extends React.Component {
  state = {
    levels: [],
    filterLevel: "Tutorial",
    orderLevel: "Popular"
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
    switch (this.state.filterLevel) {
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

  handleFilterChange = (event, data) => {
    this.setState({
      filterLevel: data.value
    })
  }

  handleOrderChange = (event, data) => {
    this.setState({
      orderLevel: data.value
    })
  }

  render() {
    return (
      <div id="index-div">
        <DropDownFilter
          handleFilterChange={this.handleFilterChange}
          filterState={this.state.filterLevel}
          handleOrderChange={this.handleOrderChange}
          orderState={this.state.orderLevel}
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
