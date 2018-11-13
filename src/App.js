import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavMenu from './components/layouts/navbar/NavMenu';
import Home from './components/main/Home.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

library.add(faHome)

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <NavMenu />
            <Switch>
              <Route exact path='/' component={ Home } />
              <Route path='/create-vote-token' component={ Home } />
              <Route path='/cast-vote' component={ Home } />
              <Route path='/find-vote' component={ Home } />
              <Route path='/distripute' component={ Home } />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
