import React, { Component } from 'react';
import { Icon, Input, Table, Message, Form, Button, Container } from 'semantic-ui-react';
import BitDB from '../lib/BitDB';
import {utils} from 'slpjs';
import BigNumber from 'bignumber.js';
import setState from '../util/asyncSetState';
import { Doughnut } from 'react-chartjs-2';
import './App.css';

import {
    Route,
    withRouter
} from "react-router-dom";
import Token from '../lib/Token';

class AirdropElectionSelection extends Component {
    state = {
        tokenId: '',
        isLoaded: false,
        ballot: null,
        fetching: true,
        fetchError: null,
        balances: []
    }

    handleSearch = () => {
        this.setState({
            isLoaded: true,
            fetching: true
        })
        this.loadBallot(this.state.tokenId).catch(console.error);
    };

    async loadBallot(id) {
        await setState(this, {
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

            await setState(this, {
                fetching: false,
                ballot,
                balances
            });
        } catch(err){
            await setState(this, {
                fetching: false,
                fetchError: err,
                isLoaded: false
            });
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({
            tokenId: value
        });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.tokenId, this.state.ballot);
    }

    renderTableChoice = (ballot) => (choice, i, list) => {
        const text = (
            <Table.Cell>
               {this.state.balances[i].toString(10)} - {choice} ({ballot.getAddress(i)})
            </Table.Cell>
        );

        return (
            <Table.Row key={i}>
                {i === 0 && <Table.Cell rowSpan={list.length}>
                    <strong>Results</strong>
                </Table.Cell>}
                {text}
                {/* {votes} */}
                {/* {address} */}
            </Table.Row>
        );
    }

    renderTable() {
        const ballot = this.state.ballot;

        return (
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Token ID</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {this.props.id}
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
                    
                    {ballot.getChoices().map(this.renderTableChoice(ballot))}

                    <Table.Row>
                        <Table.Cell>
                            <strong>Voter count</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {ballot.getQuantity().toString(10)}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <strong>End of voting</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {ballot.getEnd().toLocaleString()}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
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
            <div>
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
                    <Button onClick={this.handleSubmit} id='create-submit' type='submit' color='green'>Distribute these vote tokens</Button>
            </div>
        );
    }

    renderMain = () => {
        if (!this.state.isLoaded && !this.state.fetchError) return null
        if (this.state.fetching) {
            return (
                <Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                        <Message.Header>Just one second</Message.Header>
                        Loading ballot information
                    </Message.Content>
                </Message>
            );
        }

        if (this.state.fetchError) {
            return (
                <Message error>
                    There was an error loading the ballot: {String(this.state.fetchError)}
                </Message>
            );
        }

        const ballot = this.state.ballot;
        if(!ballot){
            return (
                <Message error>
                    Ballot not found
                </Message>
            );
        }

        return (
            <div>
                {this.renderTable()}
                {this.renderChart()}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Input style={{width: "470px"}} icon={<Icon name='search' inverted circular link onClick={this.handleSearch} />} placeholder='Enter token id' value={this.state.tokenId} onChange={this.handleChange} />
                <a className='back-button' onClick={() => {this.props.handleBack(1)}}>Go Back</a>
                {this.renderMain()}
            </div>
        );
    }
}

export default withRouter(AirdropElectionSelection);