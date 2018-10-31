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

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Segment>
          <div className='app-header'>
            <Header as='h2' icon>
              <img className="logo" src={logo} /> <br />
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
            <MenuItem exact to='/distribute'>
              Register Voters via Airdrop
            </MenuItem>
          </Menu>
          <Switch>
            <Route exact path='/' component={CreateBallot} />
            <Route path='/ballots' component={BallotFinder} />
            <Route path='/votes' component={MyVotes} />
            <Route path='/distribute' component={DistributeVotes} />
          </Switch>
        </Segment>
      </Container>
    );
  }
}

export default App;
