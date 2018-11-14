import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import './CastMyVotes.css';
import Ballot from '../../../lib/Ballot';
import BadgerWallet from '../../../lib/BadgerWallet';

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
  beforeRender = () => {
    if (this.state.fetching)
      return (
        <Container className='text-center'>
          <div className='sweet-loading'>
            <ClipLoader
              sizeUnit={"px"}
              size={80}
              color={'#123abc'}
              loading={this.state.fetching}
            />
          </div>
        </Container>
      )
    if (this.state.isLoaded && this.state.fetchError)
      return (<Container className='text-center'>Error</Container>)
    if (this.state.isLoaded && this.state.ballots.length === 0)
      return (<Container className='text-center'>No Vote tokens on this address</Container>)
  }

  render() {
    return (
      <div className='cast-container'>
        <section className='search-section text-center'>
          <Container>
            <input onChange={this.handleChange} type='text' placeholder='Enter a simpleledger address holding your voting tokens' />
            <button onClick={this.handleSearch}>SEARCH</button>
          </Container>
        </section>
        { this.beforeRender() }
        { this.state.isLoaded && !this.state.fetchError && this.state.ballots.map(this.renderTable) }
      </div>
    )
  }
}

export default CastMyVotes;