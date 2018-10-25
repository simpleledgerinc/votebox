import React, { Component } from 'react';
import {
    Button,
    Message
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import BITBOX from '../util/bitbox';
import MoneyButton from '@moneybutton/react-money-button';

import BrowserWallet from '../lib/BrowserWallet';
import BadgerWallet from '../lib/BadgerWallet';

import './PayWidget.css';

const refreshRate = 2000;

export default class PayWidget extends Component {
    static propTypes = {
        amount: PropTypes.number.isRequired,
        onReceivePayment: PropTypes.func.isRequired
    };

    componentDidMount() {
        this._interval = window.setInterval(this.checkPayment, refreshRate);
        this.checkPayment();
    }

    componentWillUnmount() {
        window.clearInterval(this._interval);
    }

    checkPayment = async () => {
        try {
            const amount = this.props.amount
                , out = await BrowserWallet.findUTXO(amount);

            if (out) {
                this._interval && window.clearInterval(this._interval);
                this.props.onReceivePayment(out);
            }
        } catch (err) {
            console.error(err);
        }
    }

    renderQRCode() {
        const amount = BITBOX.BitcoinCash.toBitcoinCash(this.props.amount)
            , value = BrowserWallet.getAddress().toUpperCase() + '?amount=' + amount;
        return <QRCode value={value} level='M' />;
    }

    renderMessage() {
        const addr = BrowserWallet.getAddress()
            , amount = BITBOX.BitcoinCash.toBitcoinCash(this.props.amount);

        return (
            <Message size='large' className='message'>
                Please send <strong>exactly {amount} BCH</strong> to<br />
                <strong>{addr}</strong>
            </Message>
        );
    }

    handleBadger = () => {
        BadgerWallet.send(BrowserWallet.getAddress(), this.props.amount);
    }

    handleWallet = () => {
        window.open(BrowserWallet.getAddress() + '?amount=' + BITBOX.BitcoinCash.toBitcoinCash(this.props.amount));
    }

    handleMBError = (err) => {
        console.error(err);
    };

    render() {
        return (
            <div className='PayWidget'>
                {this.renderMessage()}
                <div>
                    <div>
                        {this.renderQRCode()}
                    </div>
                    <div>
                        <Button color='green' disabled={!BadgerWallet.hasInstalled()} onClick={this.handleBadger}>Pay with Badger</Button>
                        <Button secondary onClick={this.handleWallet}>Pay with wallet software</Button>
                        <MoneyButton
                            to={BrowserWallet.getAddress()}
                            amount={BITBOX.BitcoinCash.toBitcoinCash(this.props.amount)}
                            currency="BCH"
                            onPayment={this.checkPayment}
                            onError={this.handleMBError} />
                    </div>
                </div>
            </div>
        );
    }
}
