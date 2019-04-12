import React, { Component } from "react"
import { Button, Header, Image, Modal } from "semantic-ui-react"

class DeleteModal extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button negative={true} onClick={this.show("inverted")}>
          DELETE
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>DELETE LEVEL</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Are you sure?</Header>
              <p>Deleting levels can't be undone!</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close}>Nope</Button>
            <Button
              negative
              icon="checkmark"
              labelPosition="right"
              content="Delete Level"
              onClick={this.props.handleDelete}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default DeleteModal
