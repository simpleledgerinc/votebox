import React, { Component } from 'react';
import { Icon, Input, Table, Message } from 'semantic-ui-react';
import BitDB from '../lib/BitDB';
import setState from '../util/asyncSetState';
import { Doughnut } from 'react-chartjs-2';
import {
    Route,
    withRouter
} from "react-router-dom";

class BallotFinder extends Component {
    state = {
        tokenId: ''
    }

    handleSearch = () => {
        this.props.history.push('/ballots/' + this.state.tokenId);
    };

    handleChange = (e, { name, value }) => {
        this.setState({
            tokenId: value
        });
    };

    render() {
        return (
            <div>
                <Input icon={<Icon name='search' inverted circular link onClick={this.handleSearch} />} placeholder='Enter token id' value={this.state.tokenId} onChange={this.handleChange} />
                <Route path="/ballots/:id" component={BallotFinderBody} />
            </div>
        );
    }
}

export default withRouter(BallotFinder);

class BallotFinderBody extends Component {
    state = {
        ballot: null,
        fetching: true,
        fetchError: null,
        chart: {
            labels: [
                'Choice #1', 'Choice #2'
            ],
            datasets: [{
                data: [50, 50],
                backgroundColor: [
                    'red', 'green'
                ],
                hoverBackgroundColor: []
            }]
        }
    };

    componentDidMount(){
        const { id } = this.props.match.params;
        this.loadBallot(id).catch(console.error);
    }

    async loadBallot(id) {
        await setState(this, {
            ballot: null,
            fetching: true,
            fetchError: null
        });

        try {
            const ballot = await BitDB.getBallot(id);
            await setState(this, {
                fetching: false,
                ballot
            });
        } catch(err){
            await setState(this, {
                fetching: false,
                fetchError: err,
            });
        }
    }

    renderTableChoice = (ballot) => (choice, i, list) => {
        const text = (
            <Table.Cell key={i}>
                {choice}
            </Table.Cell>
        );
        const address = (
            <Table.Cell key={i}>
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

    renderTable() {
        const ballot = this.state.ballot;

        return (
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Ballot ID</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {this.props.match.params.id}
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
                    
                    {ballot.getChoices().map(this.renderTableChoice)}

                    <Table.Row>
                        <Table.Cell>
                            <strong>Voting cards</strong>
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
        return (
            <Doughnut
                data={this.state.chart}
                width={400}
                options={{
                    maintainAspectRatio: true
                }} />
        );
    }

    render(){
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
}
