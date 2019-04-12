import React, { Component } from "react"
import { Button, Header, Image, Modal } from "semantic-ui-react"

class PublishModal extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button positive={true} onClick={this.show("inverted")}>
          PUBLISH
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>PUBLISH LEVEL - ARE YOU SURE?</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>
                You must complete the level after publishing for other User's to
                see it.
              </Header>
              <p>PUBLISHED LEVELS CAN NO LONGER BE EDITED!</p>
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
      </div>
    )
  }
}

export default PublishModal
