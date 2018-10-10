import React, { Component } from 'react';
import {
  Modal,
  Image,
  Header,
  Button,
  Icon
} from 'semantic-ui-react';

import badger from '../lib/badger';

export default class CreateBallotModal extends Component {
  render() {
    const { title, choices, open, onClose } = this.props;

    return (
      <Modal centered={false} open={open} onClose={onClose} closeIcon>
        <Modal.Header>Verify your input</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              <b>Title</b>&nbsp;
              <span>{title}</span>
              <br />

              <b>Choices</b>
              <ul>
                {choices.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red'>Don't use Badger</Button>
          <Button color='green'>Proceed with Badger</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
