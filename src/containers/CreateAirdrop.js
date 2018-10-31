import React, { Component } from 'react';
import {
    Step,
    Icon,
    Segment
} from 'semantic-ui-react';

import DistributeVotes from './DistributeVotes';
import PayWidget from './PayWidget';
import UploadWidget from './UploadWidget';

const STEP_LIST   = 0
    , STEP_PAY    = 1
    , STEP_AIRDROP = 2;

export default class CreateAirdrop extends Component {
    state = {
        step: STEP_LIST,
        holders: null
    };

    renderStepList = () => (
        <DistributeVotes
            onSubmit={this.handleFormSubmitted} />
    );

    handleFormSubmitted = ballot => {
        console.log(ballot);
        this.setState({
            step: STEP_PAY,
            ballot
        });
    };

    renderStepPay = () => (
        <PayWidget
            amount={this.state.ballot.estimateCost()}
            onReceivePayment={this.handlePaymentReceived} />
    );

    handlePaymentReceived = () => {
        this.setState({
            step: STEP_AIRDROP,
        });
    };

    renderStepAirdrop = () => (
        <UploadWidget
            ballot={this.state.ballot} />
    );

    render = () => (
        <div>
            <Step.Group attached='top'>
                <Step active={this.state.step === STEP_LIST}>
                    <Icon name='configure' />
                    <Step.Content>
                        <Step.Title>Select Voters</Step.Title>
                    </Step.Content>
                </Step>

                <Step active={this.state.step === STEP_PAY} disabled={this.state.step < STEP_PAY}>
                    <Icon name='bitcoin' />
                    <Step.Content>
                        <Step.Title>Pay for Airdrop</Step.Title>
                    </Step.Content>
                </Step>

                <Step active={this.state.step === STEP_AIRDROP} disabled={this.state.step < STEP_AIRDROP}>
                    <Icon name='upload' />
                    <Step.Content>
                        <Step.Title>Airdrop</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>

            <Segment attached>
                {this.state.step === STEP_LIST && this.renderStepList()}
                {this.state.step === STEP_PAY && this.renderStepPay()}
                {this.state.step === STEP_AIRDROP && this.renderStepAirdrop()}
            </Segment>
        </div>
    )
}
