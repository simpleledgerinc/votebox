import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Progress } from 'semantic-ui-react';
import { Container } from 'reactstrap';

export default class AirdropToken extends Component {
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
        <p><b>Step 2</b>: Send 0.xxxxxxxxx BCH to complete the distribution transaction</p>
        <p>Waiting for you to send the BCH (o_o)</p>
        <RightDiv>
          <CButton onClick={this.handleChangeStep} id='3' basic color='black' content='Prentend Received BCH'/>
        </RightDiv>
      </div>
    )
  }

  renderStepThird() {
    if (parseInt(this.state.step) === 3)
    return (
      <div>
        <p>Sending Vote Tokens to XX Voter Addresses</p>
        <Progress percent={45} />
        <div>Success your tokesn were distributed in transction: xyz</div>
        <Link href='#'>View this transaction on the blockchain</Link>
      </div>
    )
  }

  render(){
    return (
      <MContainer>
        <p><b>Step 1</b>: Send the Vote Tokens to distribute to simpleleger:qsfjsdknasdjsdfsdf</p>
        <p>Waiting for you to send the tokens (o_o) ...</p>
        <RightDiv>
          <CButton onClick={this.handleChangeStep} id='2' basic color='black' content='Prentend Received Tokens'/>
        </RightDiv>
        {this.renderStepSecond()}
        {this.renderStepThird()}
      </MContainer>
    );
  }
}

const RightDiv = styled.div`
  text-align: right;
`;

const MContainer = styled(Container)`
  font-size: 16px;
`;

const Link = styled.a`
  color: unset;
  text-decoration: underline;
  display: block;
  margin-top: 15px;
`;

const CButton = styled(Button)`
  min-width: 210px;
`;