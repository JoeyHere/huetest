import React from "react"
import { Card, Icon, Image } from "semantic-ui-react"
import { BLOCKCOLORS } from "../concerns/Config"

class LevelCard extends React.Component {
  generateCSS = (gameBoard = [[]], pixelSize = 10) => {
    let generatedBoxShadow = ""
    let firstPixel = BLOCKCOLORS[gameBoard[0][0]]
    gameBoard.forEach((row, ri) =>
      row.forEach((block, ci) => {
        generatedBoxShadow += `${ci * pixelSize}px ${ri * pixelSize}px 0 0 ${
          BLOCKCOLORS[block]
        }, `
      })
    )
    generatedBoxShadow = generatedBoxShadow.slice(0, -2)
    let css = {
      backgroundColor: firstPixel,
      boxShadow: generatedBoxShadow,
      height: `${pixelSize}px`,
      width: `${pixelSize}px`,
      position: "relative"
    }

    return (
      <div
        className={"levelPreviewContainer"}
        style={{
          height: `70px`,
          width: `70px`
        }}
      >
        <div
          className={"levelPreview"}
          style={{
            height: `${gameBoard.length * 5}px`,
            width: `${gameBoard[0].length * 5}px`
          }}
        >
          <div style={css} />
        </div>
      </div>
    )
  }

  render() {
    let board = JSON.parse(this.props.level_data)
    let preview = this.generateCSS(board, 5)

    let userMeta = this.props.user ? (
      <>
        <span style={{ float: "left" }}>
          <Icon name="user outline" />
          {`${this.props.user.user_name} `}
        </span>
        <span style={{ float: "right" }}>
          {this.props.completed && !this.props.userPublished ? (
            <>
              <Image
                className={"statusImage"}
                width={"20px"}
                src="https://i.ibb.co/THvVFLG/green.png"
              />
            </>
          ) : null}
          {!this.props.completed && !this.props.userPublished ? (
            <>
              <Image
                className={"statusImage"}
                width={"20px"}
                src="https://i.ibb.co/0scrPMV/red.png"
              />
            </>
          ) : null}
          {this.props.userPublished ? (
            <>
              {" "}
              {new Date(this.props.created_at).toLocaleDateString("en-GB")}{" "}
              <Icon name="arrow alternate circle up outline" />
            </>
          ) : null}
        </span>
      </>
    ) : (
      "by HUEman"
    )

    return (
      <Card
        onClick={() => this.props.handleLevelClick(this.props.id)}
        style={{
          width: "270px",
          minWidth: "270px",
          height: "182px",
          margin: "25px",
          boxShadow: "0px 0px 10px grey"
        }}
      >
        <Card.Content style={{ paddingBottom: "5px", marginTop: "4px" }}>
          <Card.Header style={{ float: "left" }}>
            {preview}
            <span style={{ margin: "auto" }}>{this.props.name}</span>
          </Card.Header>
        </Card.Content>
        <Card.Content
          style={
            this.props.completed || this.props.userPublished
              ? { backgroundColor: "rgb(220, 255, 214)" }
              : { backgroundColor: "rgb(252, 207, 207)" }
          }
          extra
        >
          {userMeta}
        </Card.Content>
        <Card.Content extra>
          <span style={{ float: "left" }}>
            <Icon color={"purple"} name="play circle" />
            {this.props.plays}
            {" / "} <Icon color={"orange"} name="trophy" />
            {this.props.completes}
          </span>
          <span style={{ float: "right" }}>
            <Icon color={"green"} name="thumbs up outline" />
            {this.props.upvotes ? this.props.upvotes : 0}
            {" / "}
            <Icon color={"red"} name="thumbs down outline" />
            {this.props.downvotes ? this.props.downvotes : 0}
          </span>
        </Card.Content>
      </Card>
    )
  }
}

export default LevelCard
