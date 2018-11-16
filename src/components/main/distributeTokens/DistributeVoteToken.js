import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import GetVoteList from './GetVoteList';
import BreadCrumb from '../../layouts/BreadCrumb';
import '../createVoteToken/directional-buttons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const STEP_GET_VOTE = 0
    , STEP_SELECT_ELECTION = 1
    , STEP_DISTRIBUTION = 2
    , STEP_ARIDROP_TOKEN = 3;

export class DistributeVoteToken extends Component {
  constructor() {
    super();

    this.state = {
      step : STEP_GET_VOTE,
      holders: []
    }
  }

  handleGoBack = () => {
    if (this.state.step === STEP_SELECT_ELECTION) {
      this.setState({
        step: STEP_GET_VOTE
      })
    } else if (this.state.step === STEP_DISTRIBUTION) {
      this.setState({
        step: STEP_SELECT_ELECTION
      })
    } else if (this.state.step === STEP_ARIDROP_TOKEN) {
      this.setState({
        step: STEP_DISTRIBUTION
      })
    }
  }

  renderBody = () => {
    switch (this.state.step) {
      case STEP_SELECT_ELECTION:
       return <GetVoteList />
      case STEP_DISTRIBUTION:
       return <GetVoteList />
      case STEP_ARIDROP_TOKEN:
       return <GetVoteList />
      default:
        return <GetVoteList onSubmit={this.handleGetVoteSubmit} />
    }
  }

  handleGetVoteSubmit = (holders) => {
    this.setState({
      step: STEP_SELECT_ELECTION,
      holders
    })
  }

  render() {
    return (
      <div>
        <Container>
          <BreadCrumb crumb='Distribute Vote Token' />
          { this.state.step === STEP_GET_VOTE ? null :
            <PrevButton onClick={this.handleGoBack}>
              <FontAwesomeIcon icon='angle-double-left' />&nbsp;
              Previous
            </PrevButton>
          }
        </Container>
        <Container style={{minWidth: '610px', padding: '30px 0'}} className='text-center'>
          <Tab first active={this.state.step === STEP_GET_VOTE } className='btn btn-arrow-right '>
            <TabName>Get Voter List</TabName>
          </Tab>
          <Tab active={this.state.step === STEP_SELECT_ELECTION } className={'btn btn-arrow-right ' + (this.state.step === STEP_SELECT_ELECTION ? 'active' : '')}>
            <TabName>Select Election</TabName>
          </Tab>
          <Tab active={this.state.step === STEP_DISTRIBUTION } className={'btn btn-arrow-right ' + (this.state.step === STEP_DISTRIBUTION ? 'active' : '')}>
            <TabName>Distribution</TabName>
          </Tab>
          <Tab last active={this.state.step === STEP_ARIDROP_TOKEN } className={'btn btn-arrow-right ' + (this.state.step === STEP_ARIDROP_TOKEN ? 'active' : '')}>
            <TabName>Airdrop Token</TabName>
          </Tab>
        </Container>
        { this.renderBody() }        
      </div>
    )
  }
}

export default DistributeVoteToken

const Tab = styled.button`
  background: ${props => props.active ? '#777777' : '#ececec'};
  color: ${props => props.active ? 'white' : '#322f31'};
  outline: none!important;
  border-radius: 0!important;
  font-size: 16px!important;
  font-weight: bold!important;
  padding: 18px 0!important;
  margin-right: 10px!important;
  width: ${props => props.first ? '21%' : '23%'};
  cursor: unset!important;
  height: 60px;
  :before {
    background: ${props => props.first ? 'unset!important;' : ''}
  }
  :after {
    background: ${props => props.last ? 'unset!important;' : ''}
  }
`;

const PrevButton = styled.button`
  float: right;
  background: #24a5dc;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 8px 15px;
  margin-top: -5px;
  border: none;
  cursor: pointer;
`;

const TabName = styled.span`
  margin-left: 30px;
  position: relative;
  z-index: 15;
`;