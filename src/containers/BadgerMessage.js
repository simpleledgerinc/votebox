import React, { PureComponent } from 'react';
import {
    Message
} from 'semantic-ui-react';

import BadgerWallet from '../lib/BadgerWallet';

export default class BadgerMessage extends PureComponent {
    render() {
        if (!BadgerWallet.hasInstalled()) {
            return (
                <Message info>
                    <Message.Header>Install Badger for greater experience</Message.Header>
                    <a href="https://badgerwallet.cash" target="_blank">Visit the Badger website</a>
                </Message>
            );
        }
        
        return null;
    }
}
