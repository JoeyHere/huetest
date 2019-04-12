import React from "react"
import { Dropdown } from "semantic-ui-react"

const difficultyOptions = [
  {
    key: "All",
    text: "All",
    value: "All",
    image: { src: "https://i.ibb.co/nsm8vdz/blue.png" }
  },
  {
    key: "Hard",
    text: "Hard",
    value: "Hard",
    image: { src: "https://i.ibb.co/0scrPMV/red.png" }
  },
  {
    key: "Easy",
    text: "Easy",
    value: "Easy",
    image: { src: "https://i.ibb.co/THvVFLG/green.png" }
  },
  {
    key: "HUEman",
    text: "HUEman",
    value: "HUEman",
    image: { src: "https://i.ibb.co/t49MPMt/hmframe1.png" }
  },
  {
    key: "Tutorial",
    text: "Tutorial",
    value: "Tutorial",
    image: { src: "https://i.ibb.co/fHMm8Rw/brown.png" }
  }
]

const sortOptions = [
  {
    key: "New",
    text: "New",
    value: "New",
    image: { src: "https://i.ibb.co/ZLVxh9P/yellow.png" }
  },
  {
    key: "Popular",
    text: "Popular 🔥",
    value: "Popular",
    image: { src: "https://i.ibb.co/WByw4cs/orange.png" }
  }
]

const DropDownFilter = props => (
  <span className="filterLevels">
    Show{" "}
    <Dropdown
      onChange={props.handleFilterChange}
      inline
      options={difficultyOptions}
      value={props.filterState}
    />
    Levels, Sorted By{" "}
    <Dropdown
      onChange={props.handleOrderChange}
      inline
      options={sortOptions}
      value={props.orderState}
    />
  </span>
)

export default DropDownFilter
