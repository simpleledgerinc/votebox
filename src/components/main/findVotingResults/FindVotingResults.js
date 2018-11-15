import React, { Component } from 'react';
import { Container, Table, Alert } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import BitDB from '../../../lib/BitDB';
import BigNumber from 'bignumber.js';
import { Doughnut } from 'react-chartjs-2';
import Token from '../../../lib/Token';
import './FindVotingResults.css';

export default class FindVotingResults extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokenId: '',
      ballot: null,
      fetching: false,
      fetchError: null,
      isLoaded: false,
      balances: []
    }
  }

  handleChange = (e) => {
    this.setState({
      tokenId: e.target.value
    })
  }

  handleSearch = () => {
    this.loadBallots(this.state.tokenId).catch(console.error);
  }

  async loadBallots(id){
      this.setState({
        ballot: null,
        fetching: true,
        fetchError: null,
        balances: []
      });
      try {
          const ballot = await BitDB.getBallot(id);
          const balances = [];
          for(let i = 0; i < ballot.getChoices().length; i++){
              const addr = ballot.getAddress(i);
              const balance = await Token.getBalance(id, addr);
              balances.push(balance);
          }
          this.setState({
              fetching: false,
              ballot,
              balances,
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

  renderChart(){
      const labels = this.state.ballot.getChoices().map((choice, i) => `Choice #${i + 1}`)
          , sum    = this.state.balances.reduce((sum, cur) => sum.plus(cur), new BigNumber(0));

      let data = [];
      for(let i = 0; i < this.state.balances.length; i++){
          let percent;
          if(sum.isZero()){
              percent = 1 / labels.length;
          } else {
              percent = this.state.balances[i].dividedBy(sum).toNumber();
          }
          data.push(percent * 100);
      }

      return (
          <Doughnut
              data={{
                  labels,
                  datasets: [{
                      data, 
                      backgroundColor: [
                          '#F59332', '#478559', '#020202', '#4D4D4D', '#854673'
                      ],
                      hoverBackgroundColor: []
                  }]
              }}
              width={400}
              options={{
                  maintainAspectRatio: true
              }} />
      );
  }
  renderTable = () => {
    console.log('asdfasdf')
    const ballot = this.state.ballot;

    return (
      <Container>
        <Table bordered>
          <tbody>
            <tr>
              <th scope="row">Ballot ID</th>
              <td>
                { this.state.tokenId }
              </td>
            </tr>
            <tr>
              <th scope="row">Title</th>
              <td>
                { ballot.getTitle() }
              </td>
            </tr>
            <tr>
              <th scope="row">Results</th>
              <td className='choice-column'>
                { ballot.getChoices().map((choice, index) => {
                  return (
                    <span key={index}>{this.state.balances[index].toString(10)} - {choice} ({ballot.getAddress(index)})</span>
                  )
                }) }
              </td>
            </tr>
            <tr>
              <th scope="row">Voter Count</th>
              <td>
                { ballot.getQuantity().toString(10) }
              </td>
            </tr>
            <tr className='choice-column'>
              <th scope="row">End of Voting</th>
              <td>
                { ballot.getEnd().toLocaleString() }
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
    if (this.state.isLoaded && !this.state.ballot) {
      return (<Alert color='danger'>Ballot not found.</Alert>)
    }
    return (
      <div className='text-left'>
        { this.state.isLoaded && this.renderTable() }
      </div>
    )
  }

  render() {
    return (
      <div className='find-container'>
        <section className='search-section text-center'>
          <Container>
            <input onChange={this.handleChange} type='text' placeholder='Enter Token Id' />
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
