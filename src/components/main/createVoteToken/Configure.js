import React, { Component } from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import BigNumber from 'bignumber.js';
import Ballot from '../../../lib/Ballot';
import BadgerWallet from '../../../lib/BadgerWallet';
import { minQuantity, maxQuantity } from '../../../lib/Token';
import bchaddr from 'bchaddrjs-slp';
import PropTypes from 'prop-types';
import './Configure.css';

export class Configure extends Component {  
  constructor() {
    super()

    this.state = {
      title: '',
      choices: [
        'This is the first choice for the issue',
        'This is the second choice for the issue',
      ],
      cards: new BigNumber(2),
      receiver: '',
      endTime: '',
      ballot: null
    }
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  handleSubmit = () => {
      const ballot = new Ballot();
      ballot.setTitle(this.state.title);
      ballot.setChoices(this.state.choices);
      ballot.setEnd(new Date(this.state.endTime));
      ballot.setQuantity(this.state.cards);
      ballot.setReceiver(this.state.receiver);
      this.props.onSubmit(ballot);
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    if (id.indexOf('choice-') === 0) {
        const i = parseInt(id.substr(7))
            , choices = this.state.choices.map(str => String(str)); // clone
        choices[i] = value;
        if (value.length === 0) {
            for (let i = choices.length - 1; i >= 0; i--) {
                if (choices[i].length === 0) {
                    choices.pop();
                } else {
                    break;
                }
            }
        }
        this.setState({ choices });
    } else if (id === 'title') {
        this.setState({ title: value });
    } else if (id === 'cards') {
        const bn = new BigNumber(value);
        if(bn.isLessThan(minQuantity) || bn.isGreaterThan(maxQuantity)){
            e.target.setCustomValidity('Please enter a valid uint64');
        } else {
            e.target.setCustomValidity('');
        }
        this.setState({ cards: bn });
    } else if (id === 'receiver') {
        try {
            if(bchaddr.isSlpAddress(value)){
                e.target.setCustomValidity('');
            } else {
                e.target.setCustomValidity('Please use the simpleledger format');
            }
        } catch(err){
            console.error(err);
            e.target.setCustomValidity('Please enter a valid simpleledger address');
        }
        this.setState({ receiver: value });
    } else if (id === 'endTime'){
        if(isNaN(new Date(value))){
            e.target.setCustomValidity('Please enter a valid date & time');
        } else {
            e.target.setCustomValidity('');
        }
        this.setState({ endTime: value });
    }
  }

  renderChoices() {
      const items = [];

      for (let i = 0; i < this.state.choices.length; i++) {
          items.push(
            <input required key={i} id={'choice-' + i} value={this.state.choices[i]} onChange={this.handleChange} />
          );
      }
      items.push(
        <input key={items.length} id={'choice-' + items.length} placeholder="The next choice goes here..." onChange={this.handleChange} />
      );

      return items;
  }

  handleBadgerFill = () => {
    if (!BadgerWallet.hasInstalled()) return
      this.setState({
          receiver: BadgerWallet.getSLPAddress()
      });
  };

  render() {
    return (
      <div className='configure'>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup className='input-field'>
            <Label for='title'>Description of Issue to Vote on:</Label><br />
            <input required type='text' id='title' placeholder='Issue to vote on' value={this.state.title} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup className='input-field'>
            <Label for='cards'>How many votes will be cast:</Label><br />
            <input required type='number' id='cards' placeholder='Enter quantity of vote tokens to be issued.' min='2' max='18446744073709551615' value={this.state.cards} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup className='input-field'>
            <Label>Issue Choices:</Label><br />
            { this.renderChoices() }
          </FormGroup>
          <FormGroup className='input-field'>
            <Label for='receiver'>Address to initially receive voter tokens:</Label><br />
            <div className='address'>
              <input required type='text' id='receiver' placeholder='Simpleledger address of ballot cards receiver.' value={this.state.receiver} onChange={this.handleChange} />
              <button type='button' disabled={!BadgerWallet.isLoggedIn()} onClick={this.handleBadgerFill}>Fill with Badger Wallet address</button>
            </div>
          </FormGroup>
          <FormGroup className='input-field'>
            <Label for='endTime'>Vote expiration time:</Label><br />
            <input required type='datetime-local' id='endTime' value={this.state.endTime} onChange={this.handleChange}/>
          </FormGroup>
          <button type='submit' className='btn btn-submit'>Create Token</button>
        </Form>
      </div>
    )
  }
}

export default Configure
