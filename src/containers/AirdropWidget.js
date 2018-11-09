import React, { Component } from 'react'
import {
    Button,
    Container,
    Progress
} from 'semantic-ui-react'
import './components/AirdropWidget.css'
import './App.css'

export default class UploadWidget extends Component {
    constructor() {
        super()
        this.state = {
            step: 1
        }
    }

    handleChangeStep = (e) => {
        this.setState({
            step: e.target.id
        })
    }

    renderStepSecond() {
        if (parseInt(this.state.step) < 2) return null
        return (
            <div>
                <p>Step 2: Send 0.xxxxxxxxx BCH to complete the distribution transaction</p>
                <p>Waiting for you to send the BCH (o_o)</p>
                <Container textAlign='right'>
                    <Button onClick={this.handleChangeStep} id='3' basic color='black' content='Prentend Received BCH'/>
                </Container>
            </div>
        )
    }

    renderStepThird() {
        if (parseInt(this.state.step) == 3)
        return (
            <div>
                <p>Sending Vote Tokens to XX Voter Addresses</p>
                <Progress percent={45} />
                <div>Success your tokesn were distributed in transction: xyz</div>
                <a href='#' style={{color: 'unset', textDecoration: 'underline'}}>View this transaction on the blockchain</a>
            </div>
        )
    }

    render(){
        return (
            <div className='airdrop-content'>
                <a className='back-button' onClick={() => {this.props.handleBack(3)}}>Go Back</a>
                <p>Step 1: Send the Vote Tokens to distribute to simpleleger:qsfjsdknasdjsdfsdf</p>
                <p>Waiting for you to send the tokens (o_o) ...</p>
                <Container textAlign='right'>
                    <Button onClick={this.handleChangeStep} id='2' basic color='black' content='Prentend Received Tokens'/>
                </Container>
                {this.renderStepSecond()}
                {this.renderStepThird()}
            </div>
        );
    }
}
