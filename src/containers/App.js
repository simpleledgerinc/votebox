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
import AirdropCreate from './AirdropCreate';
import MyVotes from './MyVotes';
import OffchainDocuments from './OffchainDocuments';
import MenuItem from './MenuItem';

import './App.css';
import logo from '../images/votebox-logo.png';

import BrowserWallet from '../lib/BrowserWallet';

BrowserWallet.findTokenUTXO().then(console.log).catch(console.error);

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
                        <MenuItem exact to='/'>
                            Create New Vote Token
                        </MenuItem>
                        <MenuItem to='/votes'>
                            Cast My Votes
                        </MenuItem>
                        <MenuItem to='/ballots'>
                            Find Voting Results
                        </MenuItem>
                        <MenuItem exact to='/airdrop'>
                            Distribute Vote Tokens
                        </MenuItem>
                        <MenuItem exact to='/offchain'>
                            Offchain Documents
                        </MenuItem>
                    </Menu>
                    <Switch>
                        <Route exact path='/' component={CreateBallot} />
                        <Route path='/ballots' component={BallotFinder} />
                        <Route path='/votes' component={MyVotes} />
                        <Route path='/airdrop' component={AirdropCreate} />
                        <Route path='/offchain' component={OffchainDocuments} />
                    </Switch>
                </Segment>
            </Container>
        );
    }
}

export default App;
