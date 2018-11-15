import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Configure from './Configure';
import Pay from './Pay';
import Publish from './Publish';
import './CreateVoteToken.css';
import './directional-buttons.css';

const STEP_CONFIGURE = 0
    , STEP_PAY = 1
    , STEP_PUBLISH = 2;

export class CreateVoteToken extends Component {
  constructor() {
    super()

    this.state = {
      step: STEP_CONFIGURE,
      ballot: null
    }
  }

  handleConfigureSubmit = (ballot) => {
    console.log(ballot.estimateCost())
    this.setState({
      step: STEP_PAY,
      ballot
    })
  }

  handlePaySubmit = () => {
    this.setState({
      step: STEP_PUBLISH
    })
  }

  renderBody = () => {
    switch (this.state.step) {
      case STEP_CONFIGURE:
       return <Configure onSubmit={this.handleConfigureSubmit}/>
      case STEP_PAY:
       return <Pay amount={this.state.ballot.estimateCost()} onReceivePayment={this.handlePaySubmit}/>
      case STEP_PUBLISH:
       return <Publish ballot={this.state.ballot}/>
    }
  }

  render() {
    return (
      <div className='new-token-container'>
        <hr />
        <Container className='create-vote-token' style={{textAlign: 'center'}}>
          <button className={'btn configure btn-arrow-right ' + (this.state.step === STEP_CONFIGURE ? 'active' : '')}>Configure</button>
          <button className={'btn pay btn-arrow-right ' + (this.state.step === STEP_PAY ? 'active' : '')}>Pay</button>
          <button className={'btn publish btn-arrow-right ' + (this.state.step === STEP_PUBLISH ? 'active' : '')}>Publish</button>
        </Container>
        <Container style={{padding: '30px 40px'}}>
          { this.renderBody() }
        </Container>
      </div>
    )
  }
}

export default CreateVoteToken
