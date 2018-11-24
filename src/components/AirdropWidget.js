import React, { Component } from 'react'
import {
    Button,
    Container,
    Progress,
    Header,
    Icon,
    Step,
    Segment,
    Loader
} from 'semantic-ui-react'
import './AirdropWidget.css';
import BrowserWallet from '../lib/BrowserWallet';
import BigNumber from 'bignumber.js';

export default class UploadWidget extends Component {
    state = {
        step: 1,
        tokenInputs: [],
        tokens: 0,
        fees: 0
    }

    _requiredTokenAmount = 0;

    componentDidMount(){
        this._requiredTokenAmount = this.props.holders.reduce((sum, holder) => sum + parseInt(holder.amount), 0);
        this.setState({
            tokens: this._requiredTokenAmount
        })
        this.checkTokensReceived();
    }

    handleChangeStep = (e) => {
        const step = parseInt(e.target.id);
        this.setState({
            step
        })
    }

    renderStepFirst() {
        if (this.state.step !== 1) return null;
        return (
            <div>
                <Header as='h2' icon>
                    <div>
                        <Loader active inline />
                    </div>
                    Deposit tokens: {this.state.tokens} remaining
                    <Header.Subheader>Deposit tokens to <strong>{BrowserWallet.getSLPAddress()}</strong>.</Header.Subheader>
                </Header>
            </div>
        );
    }

    checkTokensReceived = async () => {
        try {
            const utxos = await BrowserWallet.findTokenUTXO(this.props.tokenId);

            let amount = 0;
            let list = [];
            for(const utxo of utxos){
                amount += utxo.slp.quantity;
                list.push(utxo);

                if(amount >= this._requiredTokenAmount){
                    this.setState({
                        tokenInputs: list,
                        step: 2,
                        fees: BrowserWallet.calculateSendTokenCost(this.props.holders.length, 1 + list.length)
                    });
                    this.checkFeesReceived();
                    return;
                } else {
                    this.setState({
                        tokens: this._requiredTokenAmount - utxo.slp.quantity
                    });
                }
            }
            setTimeout(this.checkTokensReceived, 1000);
        } catch(err){
            console.error(err);
        }
    }

    renderStepSecond() {
        if (this.state.step !== 2) return null;
        return (
            <div>
                <Header as='h2' icon>
                    <div>
                        <Loader active inline />
                    </div>
                    Send fees ({(this.state.fees / 100000000).toFixed(8)} BCH)
                    <Header.Subheader>Send fees to <strong>{BrowserWallet.getAddress()}</strong>. They are required to distribute the tokens.</Header.Subheader>
                </Header>
            </div>
        )
    }

    checkFeesReceived = async () => {
        try {
            const utxo = await BrowserWallet.findUTXO(this.state.fees);
            if(utxo){
                this.setState({
                    step: 3
                });
                this.sendAirdropTransactions();
                return;
            }

            setTimeout(this.checkFeesReceived, 1000);
        } catch(err){
            console.error(err);
        }
    }

    renderStepThird() {
        if (this.state.step !== 3) return null;
        return (
            <div>
                <p>Sending Vote Tokens to XX Voter Addresses</p>
                <Progress percent={45} />
                <div>Success your tokens were distributed in transction: xyz</div>
                <a href='#' style={{color: 'unset', textDecoration: 'underline'}}>View this transaction on the blockchain</a>
            </div>
        )
    }

    sendAirdropTransactions = async () => {
        try {
            let recipients = [];
            for(let i = 0; i < this.props.holders.length; i++){
                const h = this.props.holders[i];
                console.log(this.props.holders[i])
                /*recipients.push({
                    address: h.address,
                    amount: new BigNumber(h.amount),
                });*/
                recipients.push(0);
            }
            console.log(this.props.holders)
            console.log(recipients)
            await BrowserWallet.sendToken(this.props.tokenId, recipients);
        } catch(err) {
            console.error(err);
        }
    };

    render(){
        return (
            <div className='airdrop-content'>
                <div>
                    <div>
                        <Step.Group vertical>
                            <Step active={this.state.step === 1} completed={this.state.step > 1}>
                                <Icon name='certificate' />
                                <Step.Content>
                                    <Step.Title>Deposit tokens</Step.Title>
                                    <Step.Description>Send tokens to the displayed address</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active={this.state.step === 2} completed={this.state.step > 2}>
                                <Icon name='payment' />
                                <Step.Content>
                                    <Step.Title>Pay fee</Step.Title>
                                    <Step.Description>Send fee to distribute the tokens</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active={this.state.step === 3} completed={this.state.step > 3}>
                                <Icon name='share' />
                                <Step.Content>
                                    <Step.Title>Distribute</Step.Title>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </div>
                    <div>
                        <Segment placeholder className='segment'>
                            {this.renderStepFirst()}
                            {this.renderStepSecond()}
                            {this.renderStepThird()}
                        </Segment>
                    </div>
                </div>
            </div>
        );
    }
}
