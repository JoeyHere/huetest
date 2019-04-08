import React from "react"
import GameBoard from "./GameBoard.js"
import Palette from "../components/Palette.js"
import { BLOCKS, blankBoards } from "../concerns/Config.js"
import { Form, Button } from "semantic-ui-react"
import API from "../concerns/API.js"

export default class LevelEditor extends React.Component {
  state = {
    currentBoard: [[]],
    selectedColor: 2,
    level_name: "",
    level_size: "small"
  }

  componentDidMount() {
    if (this.props.id) {
      API.getLevelFromId(this.props.id).then(level => {
        let levelData = JSON.parse(level.level_data)
        this.setState({
          currentBoard: levelData
        })
      })
    } else {
      this.setState({
        currentBoard: blankBoards[`${this.state.level_size}`]
      })
    }
  }

  handleBlockClick = (blockx, blocky) => {
    let currentBoard = [...this.state.currentBoard.map(array => [...array])]
    currentBoard[blocky][blockx] = this.state.selectedColor
    this.setState({
      currentBoard: currentBoard
    })
  }

  handlePaletteCLick = block =>
    this.setState({
      selectedColor: BLOCKS[block]
    })

  handleSave = () => {
    API.saveLevel({
      name: this.state.level_name,
      level_data: JSON.stringify(this.state.currentBoard)
    }).then(level => this.props.history.push(`/levels/${level.id}`))
  }

  render() {
    const width = this.state.currentBoard.length * 35
    return (
      <div className={"editor"}>
        <h3>LEVEL EDITOR</h3>
        <Form style={{ width: 400 + "px", margin: "auto" }}>
          <input
            maxLength="40"
            value={this.state.level_name}
            onChange={event => {
              this.setState({ level_name: event.target.value })
            }}
            placeholder="Name your level"
          />
        </Form>
        <GameBoard
          handleBlockClick={this.handleBlockClick}
          board={this.state.currentBoard}
          width={width}
        />
        <Palette
          handleBlockClick={this.handlePaletteCLick}
          selectedBlock={this.state.selectedColor}
        />
        <Form style={{ width: 200 + "px", margin: "auto" }}>
          <Form.Group widths="equal">
            <Form.Field
              label="Level Size"
              control="select"
              onChange={event => {
                this.setState({
                  level_size: event.target.value,
                  currentBoard: blankBoards[event.target.value]
                })
              }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Form.Field>
          </Form.Group>
        </Form>
        <h3>
          <Button
            onClick={this.handleSave}
            style={{ width: 100 + "px", margin: "auto" }}
          >
            SAVE
          </Button>
        </h3>
      </div>
    )
  }
}
