import React, { Component } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import {
  Container,
  Divider,
  Header,
  Icon,
  Menu,
  Segment
} from 'semantic-ui-react';
import BadgerMessage from './BadgerMessage';
import CreateBallot from './CreateBallot';
import BallotFinder from './BallotFinder';
import MyVotes from './MyVotes';
import MenuItem from './MenuItem';

import './App.css';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Segment>
          <div className='app-header'>
            <Header as='h2' icon>
              <Icon name='bitcoin' />
              VoteBox.io
              <Header.Subheader>Voting on the Bitcoin Cash blockchain</Header.Subheader>
            </Header>
            <BadgerMessage />
          </div>
          <Divider />
          <Menu pointing secondary>
            <MenuItem to='/votes'>
              Cast My Votes
            </MenuItem>
            <MenuItem to='/ballots'>
              Find Existing Elections
            </MenuItem>
            <MenuItem exact to='/'>
              Create A New Election
            </MenuItem>
          </Menu>
          <Switch>
            <Route exact path='/' component={CreateBallot} />
            <Route path='/ballots' component={BallotFinder} />
            <Route path='/votes' component={MyVotes} />
          </Switch>
        </Segment>
      </Container>
    );
  }
}

export default App;
