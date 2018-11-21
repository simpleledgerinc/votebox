import React, { Component } from 'react';
import { Container, Table, Alert } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import './CastMyVotes.css';
import Ballot from '../../../lib/Ballot';
import Breadcrumb from '../../layouts/BreadCrumb';

export class CastMyVotes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
      ballots: [],
      fetching: false,
      fetchError: null,
      isLoaded: false
    }
  }

  handleChange = (e) => {
    this.setState({
      address: e.target.value
    })
  }

  handleSearch = () => {
    this.loadBallots(this.state.address).catch(console.error);
  }

  async loadBallots(address){
      this.setState({
          fetching: true,
          fetchError: null
      });
      try {
          const ballots = await Ballot.getActiveBallots(address);
          this.setState({
              ballots,
              fetching: false,
              isLoaded: true
          });   
      } catch(err){
          this.setState({
              fetching: false,
              fetchError: err,
              isLoaded: true
          });
      }
  }

  renderTable = ([ ballotId, ballot, cards ]) => {
    return (
      <Container key={ballotId}>
        <Table bordered>
          <tbody>
            <tr>
              <th scope="row">Ballot ID</th>
              <td>
                {ballotId}
              </td>
            </tr>
            <tr>
              <th scope="row">Title</th>
              <td>
                {ballot.getTitle()}
              </td>
            </tr>
            <tr>
              <th scope="row">Number of vote token held at this address</th>
              <td>
                {cards.toString(10)}
              </td>
            </tr>
            <tr>
              <th scope="row">Total Voter Count</th>
              <td>
                {ballot.getQuantity().toString(10)}
              </td>
            </tr>
            <tr className='choice-column'>
              <th scope="row">Vote Choices</th>
              <td>
                { ballot.getChoices().map((choice, index) => {
                  return (
                    <span key={index}>{ choice }</span>
                  )
                })}
              </td>
            </tr>
          </tbody>
        </Table>          
      </Container>
    )
  }
  renderBody = () => {
    if (this.state.fetching)
      return (
        <div className='sweet-loading'>
          <ClipLoader
            sizeUnit={"px"}
            size={80}
            color={'#123abc'}
            loading={this.state.fetching}
          />
        </div>
      )
    if (this.state.isLoaded && this.state.fetchError)
      return (
        <Alert color='danger'>There was an error loading the ballot. {String(this.state.fetchError)}</Alert>
      )
    if (this.state.isLoaded && this.state.ballots.length === 0)
      return (<Alert color='danger'>No Vote tokens on this address</Alert>)
    return (this.state.ballots.map(this.renderTable))
  }

  render() {
    return (
      <div className='cast-container'>
        <Container>
          <Breadcrumb crumb='Cast My Votes' />
        </Container>
        <section className='search-section text-center'>
          <Container>
            <input onChange={this.handleChange} type='text' placeholder='Enter a simpleledger address holding your voting tokens' />
            <button onClick={this.handleSearch}>SEARCH</button>
          </Container>
        </section>
        <Container className='text-center'>
          { this.renderBody() }
        </Container>
      </div>
    )
  }
}

export default CastMyVotes;