import React from "react"
import { Dropdown } from "semantic-ui-react"

const DropdownFilter = () => (
  <Dropdown text="Sort" icon="sort" floating labeled button className="icon">
    <Dropdown.Menu>
      <Dropdown.Item>
        Popular <span role="img">🔥</span>
      </Dropdown.Item>
      <Dropdown.Item>Tutorial</Dropdown.Item>
      <Dropdown.Item>HUEman</Dropdown.Item>
      <Dropdown.Item>Hard</Dropdown.Item>
      <Dropdown.Item>Easy</Dropdown.Item>
      <Dropdown.Item>New</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default DropdownFilter
