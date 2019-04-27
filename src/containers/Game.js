import React from "react"
import GameBoard from "./GameBoard.js"
import { BLOCKS } from "../concerns/Config.js"
import API from "../concerns/API.js"
import "../confetti.scss"
import Confetti from "../components/Confetti.js"
import { Button, Icon } from "semantic-ui-react"
import Sound from "react-sound"
import PublishModal from "../components/PublishModal.js"
import DeleteModal from "../components/DeleteModal.js"
import RulesModal from "../components/RulesModal.js"
import {
  removeFlashBlocks,
  checkBlockExists,
  moveBlocks,
  getMovingBlocks,
  combineBlocks,
  updatePlayerOnBoard,
  getPlayerPositionFromBoard,
  clearBoardOfThrees
} from "./GameLogic"

export default class Game extends React.Component {
  state = {
    originalBoard: [[]],
    undoBoard: [[]],
    currentBoard: [[]],
    creator_name: undefined,
    creator_id: undefined,
    playerPosition: { x: undefined, y: undefined },
    levelName: "",
    levelWon: false,
    keydown: false,
    preview: false,
    playSound: false,
    soundID: undefined,
    rated: false,
    mute: false,
    moves: 0
  }

  componentDidMount() {
    API.getLevelFromId(this.props.id).then(level => {
      if (level) {
        let levelData = JSON.parse(level.level_data)
        this.setState({
          playerPosition: getPlayerPositionFromBoard(levelData),
          originalBoard: levelData,
          currentBoard: levelData,
          undoBoard: levelData,
          levelName: level.name,
          creator_name: level.user.user_name,
          preview: !level.published,
          creator_id: level.user.id,
          mute: this.props.mute
        })
      } else {
        this.props.history.push(`/levels`)
      }
    })

    document.addEventListener("keydown", this.handleKeyDown)
    document.addEventListener("keyup", this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
    document.removeEventListener("keyup", this.handleKeyUp)
  }

  handleKeyDown = event => {
    event.preventDefault()
    if (this.state.levelWon === false) {
      if (!this.state.keydown) {
        if (event.key === "a" || event.key === "ArrowLeft") {
          this.movePlayer(-1, 0)
        }
        if (event.key === "d" || event.key === "ArrowRight") {
          this.movePlayer(1, 0)
        }
        if (event.key === "w" || event.key === "ArrowUp") {
          this.movePlayer(0, -1)
        }
        if (event.key === "s" || event.key === "ArrowDown") {
          this.movePlayer(0, 1)
        }
        if (event.key === "r" || event.key === " ") {
          this.resetLevel()
        }
        if (event.key === "u") {
          this.undoMove()
        }
        setTimeout(this.handleKeyUp, 50)
      }
      this.setState({
        keydown: true
      })
    }
  }

  handleKeyUp = () => {
    this.setState({ keydown: false })
  }

  handleBlockClick = (event, blockx, blocky, width) => {
    event.preventDefault()
    let roundedThird = Math.floor(width / 3)
    let roundedTwoThird = Math.floor(width / 1.5)

    if (this.state.levelWon === false) {
      if (!this.state.keydown) {
        if (
          blockx <= roundedThird &&
          blocky < roundedTwoThird &&
          blocky >= roundedThird
        ) {
          this.movePlayer(-1, 0)
        }
        if (
          blockx >= roundedTwoThird &&
          blocky < roundedTwoThird &&
          blocky >= roundedThird
        ) {
          this.movePlayer(1, 0)
        }
        if (
          blocky <= roundedThird &&
          blockx < roundedTwoThird &&
          blockx >= roundedThird
        ) {
          this.movePlayer(0, -1)
        }
        if (
          blocky >= roundedTwoThird &&
          blockx < roundedTwoThird &&
          blockx >= roundedThird
        ) {
          this.movePlayer(0, 1)
        }
        setTimeout(this.handleKeyUp, 50)
      }
      this.setState({
        keydown: true
      })
    }
  }

  winGame = () => {
    API.completedLevel(this.props.id)
    this.setState({
      levelWon: true
    })
    this.playSoundEffect(4)
  }

  movePlayer = (dx, dy) => {
    let currentBoard = [...this.state.currentBoard.map(array => [...array])]
    currentBoard = removeFlashBlocks(currentBoard)
    const newBlock = {
      x: this.state.playerPosition.x + dx,
      y: this.state.playerPosition.y + dy
    }
    if (!checkBlockExists(newBlock.x, newBlock.y, currentBoard)) {
      this.winGame()
    }
    let movingBlocks = getMovingBlocks(
      this.state.playerPosition,
      newBlock,
      currentBoard
    )
    if (movingBlocks) {
      currentBoard = moveBlocks(movingBlocks, dx, dy, currentBoard)
    } else {
      currentBoard = combineBlocks(newBlock, dx, dy, [], currentBoard)
    }
    if (currentBoard) {
      currentBoard = updatePlayerOnBoard(
        this.state.playerPosition,
        newBlock,
        currentBoard
      )
      currentBoard = clearBoardOfThrees(currentBoard)

      let boardString = JSON.stringify(currentBoard)
      if (boardString.includes(JSON.stringify(BLOCKS.flash))) {
        this.playSoundEffect(1)
      } else if (boardString.includes(JSON.stringify(BLOCKS.explode))) {
        this.playSoundEffect(3)
      } else if (boardString.includes(JSON.stringify(BLOCKS.combineGreen))) {
        this.playSoundEffect(2)
      } else if (boardString.includes(JSON.stringify(BLOCKS.combinePurple))) {
        this.playSoundEffect(2)
      } else if (boardString.includes(JSON.stringify(BLOCKS.combineOrange))) {
        this.playSoundEffect(2)
      }

      this.setState({
        playerPosition: newBlock,
        currentBoard: currentBoard,
        undoBoard: this.state.currentBoard,
        moves: this.state.moves + 1
      })
      if (this.state.moves === 4) {
        API.playedLevel(this.props.id)
      }
    }
  }

  nextLevel = () => {
    if (this.state.preview) {
      this.props.history.push(`/create/${this.props.id}/edit`)
      this.props.setUser()
    } else {
      this.props.history.push(`/levels`)
      this.props.setUser()
    }
    this.props.muteGame(this.state.mute)
  }

  resetLevel = () => {
    this.setState({
      currentBoard: this.state.originalBoard,
      playerPosition: getPlayerPositionFromBoard(this.state.originalBoard),
      undoBoard: this.state.originalBoard,
      moves: 0
    })
  }

  undoMove = () => {
    this.setState({
      currentBoard: this.state.undoBoard,
      playerPosition: getPlayerPositionFromBoard(this.state.undoBoard)
    })
  }

  playSoundEffect = id => {
    this.setState({
      playSound: true,
      soundID: id
    })
  }

  handleSoundFinishedPlaying = () => {
    this.setState({
      playSound: false
    })
  }

  handlePublish = () => {
    API.publishLevel({
      name: this.state.level_name,
      level_data: JSON.stringify(this.state.originalBoard),
      id: this.props.id
    }).then(level => {
      if (level) {
        this.props.history.push(`/mylevels`)
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

  muteGame = () => {
    this.setState({ mute: !this.state.mute, playSound: false })
  }

  render() {
    const soundEffectThrees = (
      <Sound
        volume={10}
        url="https://res.cloudinary.com/dhtz4uflf/video/upload/v1555320898/sound118-2_l6nkr4.wav"
        playStatus={
          this.state.playSound && !this.state.mute && this.state.soundID === 1
            ? Sound.status.PLAYING
            : Sound.status.STOPPED
        }
        autoLoad={true}
        onFinishedPlaying={this.handleSoundFinishedPlaying}
      />
    )

    const soundEffectCombine = (
      <Sound
        volume={10}
        url="https://res.cloudinary.com/dhtz4uflf/video/upload/v1555361189/popp_ly9nob.wav"
        playStatus={
          this.state.playSound && !this.state.mute && this.state.soundID === 2
            ? Sound.status.PLAYING
            : Sound.status.STOPPED
        }
        autoLoad={true}
        onFinishedPlaying={this.handleSoundFinishedPlaying}
      />
    )

    const soundEffectExplode = (
      <Sound
        volume={10}
        url="https://res.cloudinary.com/dhtz4uflf/video/upload/v1555343875/expl_fmgba9.wav"
        playStatus={
          this.state.playSound && !this.state.mute && this.state.soundID === 3
            ? Sound.status.PLAYING
            : Sound.status.STOPPED
        }
        autoLoad={true}
        onFinishedPlaying={this.handleSoundFinishedPlaying}
      />
    )

    const soundEffectWin = (
      <Sound
        volume={10}
        url="https://res.cloudinary.com/dhtz4uflf/video/upload/v1555365788/162476__kastenfrosch__gotitem_aaoqxv.mp3"
        playStatus={
          this.state.playSound && !this.state.mute && this.state.soundID === 4
            ? Sound.status.PLAYING
            : Sound.status.STOPPED
        }
        autoLoad={true}
        onFinishedPlaying={this.handleSoundFinishedPlaying}
      />
    )
    const width = this.state.currentBoard.length * 35

    return (
      <div>
        {this.state.levelWon ? (
          <div style={{ position: "relative" }}>
            <div>{this.state.mute ? null : soundEffectWin}</div>
            <Confetti nextLevel={this.nextLevel} />
            <div className={"board blur"}>
              <h1>
                {!this.state.preview
                  ? this.state.levelName
                  : `${this.state.levelName} (Preview)`}
              </h1>
              <h4>
                {!this.state.preview
                  ? `by ${this.state.creator_name}`
                  : "COMPLETE LEVEL TO PUBLISH"}
              </h4>
              <GameBoard
                board={this.state.currentBoard}
                width={width}
                handleBlockClick={this.handleBlockClick}
              />
            </div>
            {this.state.preview === false ? (
              <>
                <div className={"winContainer"}>
                  <Button
                    id={"winButton"}
                    size={"large"}
                    primary
                    onClick={this.nextLevel}
                  >
                    LEVEL COMPLETE
                  </Button>
                  <div>
                    <Button
                      id={"winButton"}
                      size={"large"}
                      disabled={this.state.rated || !this.props.currentUser}
                      icon={"thumbs up"}
                      color={"green"}
                      onClick={() => {
                        API.upvoteLevel(this.props.id)
                        this.setState({ rated: true })
                      }}
                    />
                    <Button
                      size={"large"}
                      color="red"
                      disabled={this.state.rated || !this.props.currentUser}
                      icon={"thumbs down"}
                      onClick={() => {
                        API.downvoteLevel(this.props.id)
                        this.setState({ rated: true })
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className={"winContainer"}>
                <Button primary id="winButton" onClick={this.nextLevel}>
                  CONTINUE EDITING
                </Button>
                <PublishModal handlePublish={this.handlePublish} />
              </div>
            )}
          </div>
        ) : (
          <div className={"board"}>
            <div>
              <div>{this.state.mute ? null : soundEffectThrees}</div>
              <div>{this.state.mute ? null : soundEffectExplode}</div>
              <div>{this.state.mute ? null : soundEffectCombine}</div>
              {this.state.preview ? (
                <Button
                  size={"small"}
                  icon={"close"}
                  className={"exitButton"}
                  onClick={() => {
                    this.props.history.push(`/create/${this.props.id}/edit`)
                    this.props.muteGame(this.state.mute)
                  }}
                />
              ) : (
                <Button
                  size={"small"}
                  icon={"close"}
                  className={"exitButton"}
                  onClick={() => {
                    this.props.setUser()
                    this.props.history.push(`/levels`)
                    this.props.muteGame(this.state.mute)
                  }}
                />
              )}
              <h1>
                {!this.state.preview
                  ? this.state.levelName
                  : `${this.state.levelName} (Preview)`}
              </h1>
              <h4>
                {!this.state.preview
                  ? `by ${this.state.creator_name}`
                  : "COMPLETE LEVEL TO PUBLISH"}
              </h4>
            </div>
            <GameBoard
              board={this.state.currentBoard}
              width={width}
              handleBlockClick={this.handleBlockClick}
            />
            <div className={"resetButton"}>
              <Button animated="vertical" onClick={this.undoMove}>
                <Button.Content visible>
                  <Icon name="backward" />
                </Button.Content>
                <Button.Content hidden>Undo</Button.Content>
              </Button>
              <Button animated="vertical" onClick={this.resetLevel}>
                <Button.Content visible>
                  <Icon name="undo" />
                </Button.Content>
                <Button.Content hidden>Reset</Button.Content>
              </Button>
              <RulesModal />
              <Button
                icon={!this.state.mute ? "volume up" : "volume off"}
                onClick={this.muteGame}
              />
              {this.state.creator_id &&
              this.props.currentUser &&
              this.state.creator_id === this.props.currentUser.id ? (
                <DeleteModal
                  style={{ width: 100 + "px" }}
                  handleDelete={this.handleDelete}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    )
  }
}
