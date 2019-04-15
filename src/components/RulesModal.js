import React from "react"
import { Button, Image, Modal } from "semantic-ui-react"

const RulesModal = () => (
  <Modal style={{ width: "300px" }} trigger={<Button icon="question" />}>
    <Modal.Header>Blocks</Modal.Header>
    <Modal.Content image>
      <Image wrapped width="260px" src="https://i.ibb.co/jTk3GdK/rules3.png" />
    </Modal.Content>
  </Modal>
)

export default RulesModal
