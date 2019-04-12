import React from "react"
import GameBoard from "./GameBoard.js"
import Palette from "../components/Palette.js"
import { BLOCKS, blankBoards } from "../concerns/Config.js"
import { Form, Button } from "semantic-ui-react"
import API from "../concerns/API.js"
import PublishModal from "../components/PublishModal.js"
import DeleteModal from "../components/DeleteModal.js"

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
          currentBoard: levelData,
          level_name: level.name
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
    currentBoard = this.handlePlayerClick(currentBoard)
    if (currentBoard[blocky][blockx] !== BLOCKS.player) {
      currentBoard[blocky][blockx] = this.state.selectedColor
    }
    this.setState({
      currentBoard: currentBoard
    })
  }

  handlePlayerClick = array => {
    if (this.state.selectedColor === BLOCKS.player) {
      array = array.map(row => {
        return row.map(block =>
          block === BLOCKS.player ? BLOCKS.floor : block
        )
      })
    }
    return array
  }

  handlePaletteCLick = block =>
    this.setState({
      selectedColor: BLOCKS[block]
    })

  handleSave = () => {
    if (!this.props.id) {
      API.saveLevel({
        name: this.state.level_name,
        level_data: JSON.stringify(this.state.currentBoard)
      }).then(level => {
        if (level) {
          this.props.history.push(`/levels/${level.id}`)
        }
      })
    } else {
      API.updateLevel({
        name: this.state.level_name,
        level_data: JSON.stringify(this.state.currentBoard),
        id: this.props.id
      }).then(level => {
        if (level) {
          this.props.history.push(`/levels/${level.id}`)
        }
      })
    }
  }

  handlePublish = () => {
    API.publishLevel({
      name: this.state.level_name,
      level_data: JSON.stringify(this.state.currentBoard),
      id: this.props.id
    }).then(level => {
      if (level) {
        this.props.history.push(`/levels/${level.id}`)
      }
    })
  }

  handleDelete = () => {
    API.deleteLevel({ id: this.props.id }).then(level => {
      if (level) {
        this.props.history.push(`/mylevels`)
      }
    })
  }

  render() {
    const width = this.state.currentBoard.length * 35
    return (
      <div className={"editor"}>
        <Button
          size={"small"}
          icon={"close"}
          className={"exitButton"}
          onClick={() => this.props.history.goBack()}
        />
        <h3>LEVEL EDITOR</h3>
        <Form style={{ width: 400 + "px", margin: "auto" }}>
          <input
            maxLength="30"
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
          <Button onClick={this.handleSave} style={{ width: 150 + "px" }}>
            SAVE / PREVIEW
          </Button>
          <PublishModal
            style={{ width: 100 + "px" }}
            handlePublish={this.handlePublish}
          />
          {this.props.id ? (
            <DeleteModal
              style={{ width: 100 + "px" }}
              handleDelete={this.handleDelete}
            />
          ) : null}
        </h3>
      </div>
    )
  }
}
