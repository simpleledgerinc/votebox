import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import DistributionListTable from './partials/DistributionListTable';

export default class ConfigDistribution extends Component {
  constructor() {
    super();

    this.state = {
      tokenId: '',
      ballot: null,
      balances: []
    }
  }

  componentWillMount() {
    const { tokenId, ballot } = this.props;

    this.setState({
      tokenId,
      ballot
    })
  }

  renderTable = () => {
    const { ballot } = this.state;
    if (!ballot || !this.state.tokenId) return;
    return (
      <div>
        <Table bordered>
          <tbody>
            <tr>
              <th scope="row">Vote Token ID:</th>
              <td>
                { this.state.tokenId }
              </td>
            </tr>
            <tr>
              <th scope="row">Vote Token Name:</th>
              <td>
                { ballot.getTitle() }
              </td>
            </tr>
            <tr>
              <th scope="row">Number of Vote Tokens to be distributed:</th>
              <td>
                { ballot.getQuantity().toString(10) }
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }

  render() {
    const { ballot } = this.state;
    return (
      <Container style={{paddingTop: 0}}>
        {this.renderTable()}
        <br/>
        <DistributionListTable onSubmit={() => {this.props.onSubmit()}} id={this.state.tokenId} voteTokenQuantity={ballot ? ballot.getQuantity().toString(10) : 100}/>
      </Container>
    )
  }
}
