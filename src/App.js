import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavMenu from './components/layouts/navbar/NavMenu';
import Home from './components/main/Home.js';
import Footer from './components/layouts/Footer/Footer';
import { CreateVoteToken } from './components/main/createVoteToken/CreateVoteToken';
import { CastMyVotes } from './components/main/castMyVotes/CastMyVotes';
import FindVotingResults from './components/main/findVotingResults/FindVotingResults';
import { DistributeVoteToken } from './components/main/distributeTokens/DistributeVoteToken';
import AboutUs from './components/static-blocks/AboutUs';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faLongArrowAltLeft, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faLongArrowAltLeft, faAngleDoubleLeft, faAngleDoubleRight)

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <NavMenu />
            <div style={{minHeight: '750px'}}>
              <Switch>
                <Route exact path='/' component={ Home } />
                <Route path='/create-vote-token' component={ CreateVoteToken } />
                <Route path='/cast-vote' component={ CastMyVotes } />
                <Route path='/find-vote' component={ FindVotingResults } />
                <Route path='/distribute' component={ DistributeVoteToken } />
                <Route path='/about' component={ AboutUs } />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
