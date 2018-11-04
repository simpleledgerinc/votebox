import React, { Component } from 'react';
import { Icon, Input, Table, Message, Form, Button } from 'semantic-ui-react';
import BitDB from '../lib/BitDB';
import { utils } from 'slpjs';
import BigNumber from 'bignumber.js';
import setState from '../util/asyncSetState';
import { Doughnut } from 'react-chartjs-2';

import {
    Route,
    withRouter
} from "react-router-dom";
import Token from '../lib/Token';

class AirdropVoterList extends Component {
    state = {
        tokenId: ''
    }

    handleSearch = () => {
        this.props.history.push('/airdrop/' + this.state.tokenId);
    };

    handleChange = (e, { name, value }) => {
        this.setState({
            tokenId: value
        });
    };

    render() {
        return (
            <div>
                <Input style={{width: "470px"}} icon={<Icon name='search' inverted circular link onClick={this.handleSearch} />} placeholder='Enter id for a token already held by the voters' value={this.state.tokenId} onChange={this.handleChange} />
                <Route path="/airdrop/:id" component={() => <AirdropVoterListBody onSubmit={this.props.onSubmit} id={this.state.tokenId}/>} />
            </div>
        );
    }
}

export default withRouter(AirdropVoterList);

class AirdropVoterListBody extends Component {
    state = {
        fetching: true,
        fetchError: null,
        holders: [],
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.holders);
    }

    componentDidMount(){
        const { id } = this.props;
        this.loadToken(id).catch(console.error);
    }

    componentWillUpdate(nextProps){
        if(this.props.id !== nextProps.id){
            this.loadToken(nextProps.id).catch(console.error);
        }
    }

    async loadToken(id) {
        await setState(this, {
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

            await setState(this, {
                fetching: false,
                holders
            });

        } catch(err){
            await setState(this, {
                fetching: false,
                fetchError: err,
            });
        }
    }

    renderTableHolders = (item) => (holder, i, list) => {
        const text = (
            <Table.Cell>
               {holder.amount} - {holder.address}
            </Table.Cell>
        );

        return (
            <Table.Row key={i}>
                {i === 0 && <Table.Cell rowSpan={list.length}>
                    <strong>Distribution list (shares - address)</strong>
                </Table.Cell>}
                {text}
                {/* {votes} */}
                {/* {address} */}
            </Table.Row>
        );
    }

    renderTable() {
        const holders = this.state.holders;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <strong>Token ID for List</strong>
                            </Table.Cell>
                            <Table.Cell>
                                {this.props.id}
                            </Table.Cell>
                        </Table.Row>
                        
                        {holders.map(this.renderTableHolders(holders))}

                    </Table.Body>
                </Table>
                <Button id='create-submit' type='submit' color='green'>Distribute Vote Tokens to this List</Button>
            </Form>
        );
    }

    render(){
        if (this.state.fetching) {
            return (
                <Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                        <Message.Header>Just one second</Message.Header>
                        Loading token holders list
                    </Message.Content>
                </Message>
            );
        }

        if (this.state.fetchError) {
            return (
                <Message error>
                    There was an error loading the token holders: {String(this.state.fetchError)}
                </Message>
            );
        }

        const holders = this.state.holders;
        if(!holders){
            return (
                <Message error>
                    No holders of this token. Please check the token id.
                </Message>
            );
        }

        return (
            <div>
                {this.renderTable()}
                {/* {this.renderChart()} */}
            </div>
        );
    }
}
