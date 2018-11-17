import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import GetVoteList from './GetVoteList';
import SelectElection from './SelectElection';
import ConfigDistribution from './ConfigDistribution';
import AirdropToken from './AirdropToken';
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
      holders: [],
      voteId: null,
      ballot: null
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

  handleSkip = () => {
    this.setState({
      step: STEP_DISTRIBUTION
    })
  }

  renderBody = () => {
    switch (this.state.step) {
      case STEP_SELECT_ELECTION:
        return <SelectElection onSubmit={this.handleSelectElectionSubmit}/>
      case STEP_DISTRIBUTION:
        return <ConfigDistribution onSubmit={this.handleConfigDistributionSubmit} tokenId={this.state.voteId} ballot={this.state.ballot} />
      case STEP_ARIDROP_TOKEN:
        return <AirdropToken />
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

  handleSelectElectionSubmit = (voteId, ballot) => {
    this.setState({
      step: STEP_DISTRIBUTION,
      voteId,
      ballot
    })
  }

  handleConfigDistributionSubmit = () => {
    this.setState({
      step: STEP_ARIDROP_TOKEN
    })
  }

  render() {
    return (
      <div>
        <Container>
          <BreadCrumb crumb='Distribute Vote Token' />
          { this.state.step === STEP_GET_VOTE ?
            <CButton onClick={this.handleSkip}>
              Skip To Distribution&nbsp;
              <FontAwesomeIcon icon='angle-double-right' />
            </CButton> :
            <CButton onClick={this.handleGoBack}>
              <FontAwesomeIcon icon='angle-double-left' />&nbsp;
              Previous
            </CButton>
          }
        </Container>
        <CContainer className='text-center step-header'>
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
        </CContainer>
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

const CButton = styled.button`
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

const CContainer = styled(Container)`
  min-width: 610px;
  padding: 30px 0 30px 10px!important;
`;