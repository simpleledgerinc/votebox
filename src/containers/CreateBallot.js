import React, { Component } from 'react';
import {
    Step,
    Icon,
    Segment
} from 'semantic-ui-react';

import BadgerMessage from './BadgerMessage';
import CreateBallotForm from './CreateBallotForm';
import PayWidget from './PayWidget';
import UploadWidget from './UploadWidget';

const STEP_FORM   = 0
    , STEP_PAY    = 1
    , STEP_UPLOAD = 2;

export default class CreateBallot extends Component {
    state = {
        step: STEP_FORM,
        ballot: null
    };

    renderStepForm = () => (
        <CreateBallotForm
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
            step: STEP_UPLOAD,
        });
    };

    renderStepUpload = () => (
        <UploadWidget
            ballot={this.state.ballot} />
    );

    render = () => (
        <div>
            <BadgerMessage />
            <Step.Group attached='top'>
                <Step active={this.state.step === STEP_FORM}>
                    <Icon name='configure' />
                    <Step.Content>
                        <Step.Title>Configure</Step.Title>
                    </Step.Content>
                </Step>

                <Step active={this.state.step === STEP_PAY} disabled={this.state.step < STEP_PAY}>
                    <Icon name='bitcoin' />
                    <Step.Content>
                        <Step.Title>Pay</Step.Title>
                    </Step.Content>
                </Step>

                <Step active={this.state.step === STEP_UPLOAD} disabled={this.state.step < STEP_UPLOAD}>
                    <Icon name='upload' />
                    <Step.Content>
                        <Step.Title>Publish</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>

            <Segment attached>
                {this.state.step === STEP_FORM && this.renderStepForm()}
                {this.state.step === STEP_PAY && this.renderStepPay()}
                {this.state.step === STEP_UPLOAD && this.renderStepUpload()}
            </Segment>
        </div>
    )
}
