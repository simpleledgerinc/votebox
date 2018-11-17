import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Table, Alert } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import BitDB from '../../../lib/BitDB';

export class GetVoteList extends Component {
  constructor() {
    super();

    this.state = {
      tokenId: '',
      fetching: false,
      fetchError: null,
      holders: [],
      isLoaded: false
    }
  }

  handleSearch = () => {
    this.setState({ fetching: true, isLoaded: true })
    this.loadToken(this.state.tokenId).catch(console.error);        
  };

  async loadToken(id) {
    this.setState({
      fetching: true,
      fetchError: null,
      holders: [],
    });

    try {
      const ballot = await BitDB.getBallot(id);
      const voteAddr = [];
      for(let i = 0; i < ballot.getChoices().length; i++){
        const addr = ballot.getAddress(i);
        voteAddr.push(addr);
      }
      const holders = await BitDB.getTokenBalances(id, voteAddr);
      this.setState({
        fetching: false,
        holders,
      });
    } catch(err){
      this.setState({
        fetching: false,
        fetchError: err
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      tokenId: e.target.value,
    });
  };

  handleSubmit = () => {
      this.props.onSubmit(this.state.holders);
  }

  renderTable = () => {
    const { tokenId, holders } = this.state;

    return (
      <Container>
        <Table style={{fontSize: '15px'}} bordered>
          <tbody>
            <tr>
              <Th scope="row">Token ID for List</Th>
              <td>
                { tokenId }
              </td>
            </tr>
            <tr className='choice-column'>
              <Th>Distribution list (shares - address)</Th>
              <td>
                { holders.map((holder, index) => {
                  return (
                    <Span key={index}>
                      {holder.amount} - {holder.address}
                    </Span>
                  )
                })}
              </td>
            </tr>
          </tbody>
        </Table>
        <Button onClick={this.handleSubmit}>Distribute Vote Tokens to this List</Button>
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
        <Alert color='danger'>There was an error loading the token holders. {String(this.state.fetchError)}</Alert>
      )
    if (this.state.isLoaded && this.state.holders.length === 0) {
      return (<Alert color='danger'>No holders of this token. Please check the token id.</Alert>)
    }
    return (
      <div className='text-left'>
        { this.state.isLoaded && !this.state.fetchError && this.renderTable() }
      </div>
    )
  }

  render() {
    return (
      <div>
        <section style={{marginTop: 0}} className='search-section text-center'>
          <Container>
            <input onChange={this.handleChange} type='text' placeholder='Enter id for a token already held by the voters' />
            <button onClick={this.handleSearch}>SEARCH</button>
          </Container>
        </section>
        <Container style={{padding: 0, marginTop: '30px'}} className='text-center'>
          { this.renderBody() }
        </Container>
      </div>
    )
  }
}

export default GetVoteList

const Th = styled.th`
  vertical-align: middle!important;
  width: 25%;
`;

const Span = styled.span`
  width: 100%;
  display: block;
  border: 1px solid lightgrey;
  border-width: 0 0 1px;
  padding: 12px 20px;
  :last-child {
    border: none;
  }
`;

const Button = styled.button`
  background: #25a5dc;
  color: white;
  padding: 12px 30px;
  border-radius: 0;
  font-weight: bold;
  outline: none!important;
  border: none;
`;