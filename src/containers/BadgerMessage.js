import React, { PureComponent } from 'react';
import {
    Message
} from 'semantic-ui-react';

import badger from '../lib/badger';

export default class BadgerMessage extends PureComponent {
    render() {
        if (!badger.hasInstalledBadger()) {
            return (
                <Message info>
                    <Message.Header>Install Badger for greater experience</Message.Header>
                    <a href="https://badgerwallet.cash" target="_blank">Visit the Badger website</a>
                </Message>
            );
        }

        if(!badger.isLoggedIn()){
            return (
                <Message error>
                    <Message.Header>Can't connect to Badger</Message.Header>
                    <p>Please check that you are logged in into your wallet</p>
                </Message>
            );
        }
        
        return null;
    }
}
