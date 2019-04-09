import React from "react"
import { Dropdown } from "semantic-ui-react"

const options = [
  { key: 1, text: "Plays", value: 1 },
  { key: 2, text: "Completes", value: 2 }
]

const DropdownFilter = () => (
  <Dropdown
    text="Filter"
    icon="filter"
    floating
    labeled
    button
    className="icon"
  >
    <Dropdown.Menu>
      <Dropdown.Header content="Filter levels" />
      <Dropdown.Item>Popular 🔥</Dropdown.Item>
      <Dropdown.Item>Hard</Dropdown.Item>
      <Dropdown.Item>Easy</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default DropdownFilter
