import React from "react"
import { Dropdown } from "semantic-ui-react"

const difficultyOptions = [
  {
    key: "All",
    text: "All",
    value: "All",
    image: { src: "https://i.ibb.co/t49MPMt/hmframe1.png" }
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
    key: "Tutorial",
    text: "Tutorial",
    value: "Tutorial",
    image: { src: "https://i.ibb.co/nsm8vdz/blue.png" }
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

const DropdownExampleInline = () => (
  <span className="filterLevels">
    Show{" "}
    <Dropdown
      inline
      options={difficultyOptions}
      defaultValue={difficultyOptions[0].value}
    />
    Levels, Sorted By{" "}
    <Dropdown
      inline
      options={sortOptions}
      defaultValue={sortOptions[1].value}
    />
  </span>
)

export default DropdownExampleInline
