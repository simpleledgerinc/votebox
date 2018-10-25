import React, { Component } from 'react';
import {
    Form,
    Button
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import Ballot from '../lib/Ballot';
import BadgerWallet from '../lib/BadgerWallet';
import { minQuantity, maxQuantity } from '../lib/Token';
import bchaddr from 'bchaddrjs-slp';

export default class CreateBallotForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    state = {
        title: '',
        choices: [
            'This is the first choice',
            'This is the second choice'
        ],
        cards: new BigNumber(2),
        receiver: '',
        end: '',
        ballot: null,
    };

    handleSubmit = () => {
        const ballot = new Ballot();
        ballot.setTitle(this.state.title);
        ballot.setChoices(this.state.choices);
        ballot.setEnd(new Date(this.state.end));
        ballot.setQuantity(this.state.cards);
        ballot.setReceiver(this.state.receiver);
        this.props.onSubmit(ballot);
    }

    handleChange = (e, { name, value }) => {
        if (name.indexOf('choice-') === 0) {
            const i = parseInt(name.substr(7))
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
        } else if (name === 'title') {
            this.setState({ title: value });
        } else if (name === 'cards') {
            const bn = new BigNumber(value);
            if(bn.isLessThan(minQuantity) || bn.isGreaterThan(maxQuantity)){
                e.target.setCustomValidity('Please enter a valid uint64');
            } else {
                e.target.setCustomValidity('');
            }
            this.setState({ cards: bn });
        } else if (name === 'receiver') {
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
        } else if (name === 'end'){
            if(isNaN(new Date(value))){
                e.target.setCustomValidity('Please enter a valid date+time');
            } else {
                e.target.setCustomValidity('');
            }
            this.setState({ end: value });
        }
    };

    handleBadgerFill = () => {
        this.setState({
            receiver: BadgerWallet.getSLPAddress()
        });
    };

    renderList() {
        const items = [];

        for (let i = 0; i < this.state.choices.length; i++) {
            items.push(
                <Form.Field key={i}>
                    <Form.Input name={'choice-' + i} value={this.state.choices[i]} onChange={this.handleChange} />
                </Form.Field>
            );
        }
        items.push(
            <Form.Field key={items.length}>
                <Form.Input name={'choice-' + items.length} placeholder="The next choice goes here..." onChange={this.handleChange} />
            </Form.Field>
        );

        return items;
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Title</label>
                        <Form.Input required
                            name='title'
                            placeholder='Title'
                            value={this.state.title}
                            onChange={this.handleChange} />
                    </Form.Field>

                    <Form.Field>
                        <label>Ballot cards</label>
                        <Form.Input required
                            name='cards'
                            type='number' min='2' max='18446744073709551615'
                            placeholder='Number of ballot cards to create'
                            value={this.state.cards}
                            onChange={this.handleChange} />
                    </Form.Field>
                </Form.Group>

                <Form.Field>
                    <label>Choices</label>
                    {this.renderList()}
                </Form.Field>

                    <Form.Group widths='equal'>

                <Form.Field>
                    <label>Ballot cards receiver</label>
                    <Form.Input required
                        name='receiver'
                        placeholder='Simpleledger address of ballot cards receiver'
                        action={BadgerWallet.hasInstalled() ? {
                            type:    'button',
                            content: 'Fill with Badger wallet address',
                            onClick: this.handleBadgerFill
                        } : null}
                        value={this.state.receiver}
                        onChange={this.handleChange} />
                </Form.Field>

                <Form.Field>
                    <label>End of voting</label>
                    <Form.Input required
                        name='end' type='datetime-local'
                        value={this.state.end}
                        onChange={this.handleChange} />
                </Form.Field>
                </Form.Group>

                <Button id='create-submit' type='submit' color='green'>Create</Button>
            </Form>
        );
    }
}