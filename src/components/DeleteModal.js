import React, { Component } from "react"
import { Button, Modal } from "semantic-ui-react"

class DeleteModal extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button
          className={"deleteButton"}
          negative={true}
          onClick={this.show("inverted")}
        >
          DELETE
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close} size="tiny">
          <Modal.Header>DELETE LEVEL - ARE YOU SURE?</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p style={{ textAlign: "center" }}>
                DELETING LEVELS CAN NOT BE UNDONE
              </p>
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
