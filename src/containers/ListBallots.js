import React, { Component } from 'react';
import { Table, Message, Icon } from 'semantic-ui-react';
import BallotItem from './BallotItem';

import bitdb from '../lib/BitDB';
import setState from '../util/asyncSetState';

export default class ListBallots extends Component {
  state = {
    list: [],
    fetching: false,
    fetchErr: null,
  };

  async componentWillMount(){
    await this.fetchList();
  }

  async fetchList(){
    await setState(this, {
      fetching: true,
      fetchErr: null,
    });

    try {
      const list = await bitdb.getBallotList();
      await setState(this, {
        fetching: false,
        list
      });
    } catch(err){
      await setState(this, {
        fetching: false,
        fetchErr: err
      });
    }
  };

  renderBody() {
    if(this.state.fetching){
      return (
        <Table.Row>
          <Table.Cell colSpan={4}>
            <Message icon>
              <Icon name='circle notched' loading />
              <Message.Content>
                <Message.Header>Just one second</Message.Header>
                VoteBox is fetching ballots.
              </Message.Content>
            </Message>
          </Table.Cell>
        </Table.Row>
      );
    }

    if(this.state.fetchErr){
      return (
        <Table.Row>
          <Table.Cell colSpan={4}>
            <Message error>
              <Message.Header>There was an error fetching the ballots</Message.Header>
              <p>{String(this.state.fetchErr)}</p>
            </Message>
          </Table.Cell>
        </Table.Row>
      );
    }

    return this.state.list.map(tx => (
      <BallotItem tx={tx} />
    ));
  }

  render() {
    return (
      <Table celled structured>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Question</Table.HeaderCell>
            <Table.HeaderCell>Answers</Table.HeaderCell>
            <Table.HeaderCell>End of voting</Table.HeaderCell>
            <Table.HeaderCell>Number of cards</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        
        <Table.Body>
          {this.renderBody()}
        </Table.Body>
      </Table>
    );
  }
}
