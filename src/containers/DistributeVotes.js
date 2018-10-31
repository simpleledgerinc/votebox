import React, { Component } from 'react';
import { Icon, Input, Table, Message } from 'semantic-ui-react';
import BitDB from '../lib/BitDB';
import BigNumber from 'bignumber.js';
import setState from '../util/asyncSetState';
import { Doughnut } from 'react-chartjs-2';
import {
    Route,
    withRouter
} from "react-router-dom";
import Token from '../lib/Token';

class DistributeVotes extends Component {
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
                <Input style={{width: "470px"}} icon={<Icon name='search' inverted circular link onClick={this.handleSearch} />} placeholder='Enter token id controlling airdrop distribution' value={this.state.tokenId} onChange={this.handleChange} />
                <Route path="/ballot/:id" component={DistributeVotesBody} />
            </div>
        );
    }
}

export default withRouter(DistributeVotes);

class DistributeVotesBody extends Component {
    state = {
        ballot: null,
        fetching: true,
        fetchError: null,
        balances: [],
    };

    componentDidMount(){
        const { id } = this.props.match.params;
        this.loadBallot(id).catch(console.error);
    }

    componentWillUpdate(nextProps){
        if(this.props.match.params.id !== nextProps.match.params.id){
            this.loadBallot(nextProps.match.params.id).catch(console.error);
        }
    }

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
            });
        }
    }

    renderTableChoice = (ballot) => (choice, i, list) => {
        const text = (
            <Table.Cell>
               {this.state.balances[i].toString(10)} - {choice} ({ballot.getAddress(i)})
            </Table.Cell>
        );
        // const votes = (
        //     <Table.Cell>
        //         {this.state.balances[i].toString(10)}
        //     </Table.Cell>
        // );
        // const address = (
        //     <Table.Cell>
        //         {ballot.getAddress(i)}
        //     </Table.Cell>
        // );

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
