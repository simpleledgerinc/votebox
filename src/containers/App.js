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
import CreateBallot from './CreateBallot';
import ListBallots from './ListBallots';
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
          </div>

          <Divider />
          <Menu pointing secondary>
            <MenuItem exact to='/'>
              New ballot
            </MenuItem>
            <MenuItem to='/list'>
              All ballots
            </MenuItem>
            <MenuItem to='/votes'>
              My Votes
            </MenuItem>
          </Menu>

          <Switch>
            <Route exact path='/' component={CreateBallot} />
            <Route path='/list' component={ListBallots} />
          </Switch>
        </Segment>
      </Container>
    );
  }
}

export default App;
