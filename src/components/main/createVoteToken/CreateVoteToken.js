import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Configure from './Configure';
import Pay from './Pay';
import Publish from './Publish';
import BreadCrumb from '../../layouts/BreadCrumb';
import './CreateVoteToken.css';
import './directional-buttons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  handleGoBack = () => {
    if (this.state.step === STEP_PAY) {
      this.setState({
        step: STEP_CONFIGURE
      })
    } else if (this.state.step === STEP_PUBLISH) {
      this.setState({
        step: STEP_PAY
      })
    }
  }

  renderBody = () => {
    switch (this.state.step) {
      case STEP_PAY:
       return <Pay amount={this.state.ballot.estimateCost()} onReceivePayment={this.handlePaySubmit}/>
      case STEP_PUBLISH:
       return <Publish ballot={this.state.ballot}/>
      default:
        return <Configure onSubmit={this.handleConfigureSubmit}/>
    }
  }

  render() {
    return (
      <div>
        <Container>
          <BreadCrumb crumb='Create New Vote Token' />
          { this.state.step === STEP_CONFIGURE ? null :
            <button onClick={this.handleGoBack} className='previous-button'>
              <FontAwesomeIcon icon='angle-double-left' />&nbsp;
              Previous
            </button>
          }
        </Container>
        <Container className='create-vote-token text-center'>
          <button className={'btn configure btn-arrow-right ' + (this.state.step === STEP_CONFIGURE ? 'active' : '')}>
            <img width='25px' src={`/assets/img/configure${this.state.step === STEP_CONFIGURE ? '_active' : ''}.png`} />
            &nbsp;Configure
          </button>
          <button className={'btn pay btn-arrow-right ' + (this.state.step === STEP_PAY ? 'active' : '')}>
            <img width='25px' src={`/assets/img/pay${this.state.step === STEP_PAY ? '_active' : ''}.png`} />
            &nbsp;Pay
          </button>
          <button className={'btn publish btn-arrow-right ' + (this.state.step === STEP_PUBLISH ? 'active' : '')}>
            <img width='25px' src={`/assets/img/publish${this.state.step === STEP_PUBLISH ? '_active' : ''}.png`} />
            &nbsp;Publish  
          </button>
        </Container>
        <Container style={{padding: '30px'}}>
          { this.renderBody() }
        </Container>
      </div>
    )
  }
}

export default CreateVoteToken