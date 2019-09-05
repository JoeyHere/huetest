import React, { Component } from "react"
import { Button, Modal } from "semantic-ui-react"

class DeleteModal extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <>
        <Button
          compact
          icon="trash alternate outline"
          className={"deleteButton"}
          negative={true}
          onClick={this.show("inverted")}
        />

        <Modal dimmer={dimmer} open={open} onClose={this.close} size="mini">
          <Modal.Header>Are You Sure?</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p style={{ textAlign: "left" }}>
                Deleting Levels can not be undone!
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button compact onClick={this.close}>
              Nope
            </Button>
            <Button
              compact
              negative
              icon="trash alternate outline"
              labelPosition="right"
              content="Delete Level"
              onClick={this.props.handleDelete}
            />
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

export default DeleteModal
