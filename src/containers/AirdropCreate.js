import React, { Component } from 'react';
import {
    Step,
    Icon,
    Segment,
    Button
} from 'semantic-ui-react';
import Token from '../lib/Token';

import AirdropVoterList from './AirdropVoterList';
import AirdropElectionSelection from './AirdropElectionSelection';
import AirdropPayWidget from './AirdropPayWidget';
import AirdropWidget from './AirdropWidget';

const STEP_LIST   = 0
    , STEP_VOTE   = 1
    , STEP_PAY    = 2
    , STEP_AIRDROP = 3;

export default class AirdropCreate extends Component {
    state = {
        step: STEP_LIST,
        holders: null, 
        voteId: null,
        ballot: null
    };

    renderStepList = () => (
        <AirdropVoterList
            onSubmit={this.handleFormSubmitted} />
    );

    handleFormSubmitted = (holders) => {
        this.setState({
            step: STEP_VOTE,
            holders: holders
        })
    };

    renderStepVote = () => (
        <AirdropElectionSelection
            handleBack={this.returnToPrevious}
            onSubmit={this.handleElectionSubmitted} />
    );

    handleElectionSubmitted = (voteId, ballot) => {
        this.setState({
            step: STEP_PAY, 
            voteId,
            ballot
        });
    }

    renderStepPay = () => (
        <AirdropPayWidget
            handleBack={this.returnToPrevious}
            onSubmit={this.handlePaymentReceived}
            tokenId={this.state.voteId}
            ballot={this.state.ballot} />
    );

    handlePaymentReceived = () => {
        this.setState({
            step: STEP_AIRDROP,
        });
    };

    renderStepAirdrop = () => (
        <AirdropWidget
            handleBack={this.returnToPrevious}
            ballot={this.state.ballot} />
    );

    returnToPrevious = (step) => {
        switch (step) {
            case 1:
                this.setState({
                    step: STEP_LIST
                })
                break
            case 2:
                this.setState({
                    step: STEP_VOTE
                })
                break
            case 3:
                this.setState({
                    step: STEP_PAY
                })
                break
            default:
                break
        }
    }

    render = () => (
        <div>
            <Step.Group attached='top'>
                <Step active={this.state.step === STEP_LIST}>
                    <Icon name='configure' />
                    <Step.Content>
                        <Step.Title>Get Voter List</Step.Title>
                    </Step.Content>
                </Step>

                <Step active={this.state.step === STEP_VOTE} disabled={this.state.step < STEP_VOTE}>
                    <Icon name='configure' />
                    <Step.Content>
                        <Step.Title>Select Election</Step.Title>
                    </Step.Content>
                </Step>

                <Step active={this.state.step === STEP_PAY} disabled={this.state.step < STEP_PAY}>
                    <Icon name='configure' />
                    <Step.Content>
                        <Step.Title>Configure Distribution</Step.Title>
                    </Step.Content>
                </Step>

                <Step active={this.state.step === STEP_AIRDROP} disabled={this.state.step < STEP_AIRDROP}>
                    <Icon name='upload' />
                    <Step.Content>
                        <Step.Title>Airdrop Token to Voters</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>

            <Segment attached>
                {this.state.step === STEP_LIST && this.renderStepList()}
                {this.state.step === STEP_VOTE && this.renderStepVote()}
                {this.state.step === STEP_PAY && this.renderStepPay()}
                {this.state.step === STEP_AIRDROP && this.renderStepAirdrop()}
            </Segment>
        </div>
    )
}
