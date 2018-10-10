import React, { Component } from 'react';
import {
  Form,
  Button,
  Checkbox,
  List
} from 'semantic-ui-react';
import BadgerMessage from './BadgerMessage';
import CreateBallotModal from './CreateBallotModal';

export default class CreateBallot extends Component {
  state = {
    title: '',
    choices: [
      'This is the first choice',
      'This is the second choice'
    ],
    open: false
  };

  handleChange = (e, { name, value }) => {
    if (name.indexOf('choice-') === 0) {
      const i = parseInt(name.substr(7))
        , choices = this.state.choices.map(str => String(str)); // clone

      choices[i] = value;
      if (value.length === 0) {
        for (let i = choices.length - 1; i >= 0; i--) {
          if (choices[i].length === 0){
            choices.pop();
          } else {
            break;
          }
        }
      }

      this.setState({ choices });
    } else if(name === 'title'){
      this.setState({ title: value });
    }
  };

  renderList() {
    const items = [];

    for (let i = 0; i < this.state.choices.length; i++) {
      items.push(
        <List.Item key={i}>
          <Form.Field>
            <Form.Input name={'choice-' + i} value={this.state.choices[i]} onChange={this.handleChange} />
          </Form.Field>
        </List.Item>
      );
    }
    items.push(
      <List.Item key={items.length}>
        <Form.Field>
          <Form.Input name={'choice-' + items.length} placeholder="The next choice goes here..." onChange={this.handleChange} />
        </Form.Field>
      </List.Item>
    );

    return (
      <List bulleted>
        {items}
      </List>
    );
  }

  render() {
    return (
      <div>
        <BadgerMessage />
        <Form>
          <Form.Field>
            <label>Title</label>
            <Form.Input name='title' placeholder='Title' value={this.state.title} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Choices</label>
            {this.renderList()}
          </Form.Field>
          <Button type='submit' onClick={() => this.setState({ open: true })}>Create ballot</Button>
        </Form>
        <CreateBallotModal
          open={this.state.open}
          title={this.state.title}
          choices={this.state.choices}
          onClose={() => this.setState({ open: false })} />
      </div>
    );
  }
}
