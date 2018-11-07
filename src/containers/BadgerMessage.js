import React, { PureComponent } from 'react';
import {
    Message
} from 'semantic-ui-react';
import BadgerWallet from '../lib/BadgerWallet';

export default class BadgerMessage extends PureComponent {
    state = {
        installed: BadgerWallet.hasInstalled(),
        loggedIn: BadgerWallet.isLoggedIn()
    };

    componentDidMount(){
        this._intervalId = setInterval(this.checkBadger, 1000);
    }

    componentWillUnmount(){
        clearInterval(this._intervalId);
    }

    checkBadger = () => {
        const update = {};
        if(BadgerWallet.hasInstalled() !== this.state.installed){
            update.installed = BadgerWallet.hasInstalled();
        }
        if(BadgerWallet.isLoggedIn() !== this.state.loggedIn){
            update.loggedIn = BadgerWallet.isLoggedIn()
        }
        this.setState(update);
    }

    render() {
        if (!this.state.installed) {
            return (
                <Message info>
                    <Message.Header>Optional: Install BadgerWallet for optimized voting experience</Message.Header>
                    <a href="https://badgerwallet.cash" target="_blank">https://badgerwallet.cash</a>
                </Message>
            );
        }

        if(!this.state.loggedIn){
            return (
                <Message warning>
                    <Message.Header>You are not logged in to BadgerWallet</Message.Header>
                    With BadgerWallet logged in, you will enjoy optimized voting experience
                </Message>
            );
        }
        
        return null;
    }
}
