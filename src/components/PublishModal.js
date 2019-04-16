import React, { Component } from "react"
import { Button, Modal } from "semantic-ui-react"

class PublishModal extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <>
        <Button
          id={"winButton"}
          positive={true}
          onClick={this.show("inverted")}
        >
          PUBLISH
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close} size="tiny">
          <Modal.Header>Publish Level - Are You Sure?</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p style={{ textAlign: "center" }}>
                Published Levels can no longer be edited!
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close}>Nope</Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Publish Level"
              onClick={this.props.handlePublish}
            />
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

export default PublishModal
