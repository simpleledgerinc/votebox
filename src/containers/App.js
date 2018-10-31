import React, { Component } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import {
  Container,
  Divider,
  Header,
  Menu,
  Segment
} from 'semantic-ui-react';
import BadgerMessage from './BadgerMessage';
import CreateBallot from './CreateBallot';
import BallotFinder from './BallotFinder';
import DistributeVotes from './DistributeVotes';
import MyVotes from './MyVotes';
import MenuItem from './MenuItem';

import './App.css';
import logo from '../images/votebox-logo.png';
import CreateAirdrop from './CreateAirdrop';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Segment>
          <div className='app-header'>
            <Header as='h2' icon>
              <img className="logo" src={logo} /> <br />
              <Header.Subheader>The Decentralized Voting and Election System for Bitcoin.</Header.Subheader>
            </Header>
            <BadgerMessage />
          </div>
          <Divider />
          <Menu pointing secondary>
            <MenuItem to='/votes'>
              Cast My Vote
            </MenuItem>
            <MenuItem to='/ballots'>
              Search for an Election
            </MenuItem>
            <MenuItem exact to='/'>
              Create New Election
            </MenuItem>
            <MenuItem exact to='/airdrop'>
              Voter Registration
            </MenuItem>
          </Menu>
          <Switch>
            <Route exact path='/' component={CreateBallot} />
            <Route path='/ballots' component={BallotFinder} />
            <Route path='/votes' component={MyVotes} />
            <Route path='/airdrop' component={CreateAirdrop} />
          </Switch>
        </Segment>
      </Container>
    );
  }
}

export default App;
