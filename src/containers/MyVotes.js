import React, { Component } from 'react';
import { Container, Icon, Input, Table, Message, Button } from 'semantic-ui-react';
import Ballot from '../lib/Ballot';
import setState from '../util/asyncSetState';
import {
    Route,
    withRouter
} from "react-router-dom";
import BadgerWallet from '../lib/BadgerWallet';
import './MyVotes.css';

class MyVotes extends Component {
    state = {
        address: ''
    }

    handleSearch = () => {
        this.props.history.push('/votes/' + this.state.address);
    };

    handleChange = (e, { name, value }) => {
        this.setState({
            address: value
        });
    };

    handleBadgerFill = () => {
        this.setState({
            address: BadgerWallet.getSLPAddress()
        });
    };

    render() {
        return (
            <div>
                <Input
                    icon={<Icon name='search' inverted circular link onClick={this.handleSearch} />}
                    placeholder='Enter your address'
                    value={this.state.address}
                    onChange={this.handleChange} />
                {BadgerWallet.hasInstalled() && <Button onClick={this.handleBadgerFill}>Fill with Badger wallet address</Button>}
                <Route path="/votes/:address" component={MyVotesBody} />
            </div>
        );
    }
}

export default withRouter(MyVotes);

class MyVotesBody extends Component {
    state = {
        ballots: [],
        fetching: true,
        fetchError: null
    };

    componentDidMount(){
        const { address } = this.props.match.params;
        this.loadBallots(address)
            .catch(console.error);
    }

    componentWillUpdate(nextProps){
        if(this.props.match.params.address !== nextProps.match.params.address){
            this.loadBallots(nextProps.match.params.address)
                .catch(console.error);
        }
    }

    async loadBallots(address){
        await setState(this, {
            fetching: true,
            fetchError: null
        });
        try {
            const ballots = await Ballot.getActiveBallots(address); 
            await setState(this, {
                ballots,
                fetching: false
            });   
        } catch(err){
            await setState(this, {
                fetching: false,
                fetchError: err
            });
        }
    }

    renderChoice = (ballot) => (choice, i, list) => {
        const text = (
            <Table.Cell>
                {choice}
            </Table.Cell>
        );
        const address = (
            <Table.Cell>
                {ballot.getAddress(i)}
            </Table.Cell>
        );

        return (
            <Table.Row key={i}>
                {i === 0 && <Table.Cell rowSpan={list.length}>
                    <strong>Choices</strong>
                </Table.Cell>}
                {text}
                {address}
            </Table.Row>
        );
    }

    renderBallot = ([ ballotId, ballot, cards ]) => {
        return (
            <Container className="ballot">
                <Table>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Ballot ID</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {ballotId}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Title</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {ballot.getTitle()}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Your voting cards</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {cards.toString(10)}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Total voting cards</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {ballot.getQuantity().toString(10)}
                        </Table.Cell>
                    </Table.Row>

                    {ballot.getChoices().map(this.renderChoice(ballot))}
                </Table>
            </Container>
        );
    };

    render(){
        if (this.state.fetching) {
            return (
                <Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                        <Message.Header>Just one second</Message.Header>
                        Loading your available voting cards
                    </Message.Content>
                </Message>
            );
        }

        if (this.state.fetchError) {
            return (
                <Message error>
                    There was an error loading your votes: {String(this.state.fetchError)}
                </Message>
            );
        }

        if(this.state.ballots.length === 0){
            return (
                <Message error>
                    No Vote tokens on this address
                </Message>
            );
        }

        return (
            <div className="MyVotes">
                {this.state.ballots.map(this.renderBallot)}
            </div>
        );
    }
}
