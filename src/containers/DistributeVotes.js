import React, { Component } from 'react';
import { Icon, Input, Table, Message } from 'semantic-ui-react';
import BitDB from '../lib/BitDB';
import {utils} from 'slpjs';
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
                <Input style={{width: "470px"}} icon={<Icon name='search' inverted circular link onClick={this.handleSearch} />} placeholder='Enter token id controlling airdrop distribution' value={this.state.tokenId} onChange={this.handleChange} />
                <Route path="/airdrop/:id" component={DistributeVotesBody} />
            </div>
        );
    }
}

export default withRouter(DistributeVotes);

class DistributeVotesBody extends Component {
    state = {
        fetching: true,
        fetchError: null,
        holders: [],
    };

    componentDidMount(){
        const { id } = this.props.match.params;
        this.loadToken(id).catch(console.error);
    }

    componentWillUpdate(nextProps){
        if(this.props.match.params.id !== nextProps.match.params.id){
            this.loadToken(nextProps.match.params.id).catch(console.error);
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
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Token ID Address List</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {this.props.match.params.id}
                        </Table.Cell>
                    </Table.Row>
                    
                    {holders.map(this.renderTableHolders(holders))}

                </Table.Body>
            </Table>
        );
    }

    // renderChart(){
    //     const labels = this.state.ballot.getChoices().map((choice, i) => `Choice #${i + 1}`)
    //         , sum    = this.state.balances.reduce((sum, cur) => sum.plus(cur), new BigNumber(0));

    //     let data = [];
    //     for(let i = 0; i < this.state.balances.length; i++){
    //         let percent;
    //         if(sum.isZero()){
    //             percent = 1 / labels.length;
    //         } else {
    //             percent = this.state.balances[i].dividedBy(sum).toNumber();
    //         }
    //         data.push(percent * 100);
    //     }

    //     return (
    //         <Doughnut
    //             data={{
    //                 labels,
    //                 datasets: [{
    //                     data, 
    //                     backgroundColor: [
    //                         '#F59332', '#478559', '#020202', '#4D4D4D', '#854673'
    //                     ],
    //                     hoverBackgroundColor: []
    //                 }]
    //             }}
    //             width={400}
    //             options={{
    //                 maintainAspectRatio: true
    //             }} />
    //     );
    // }

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
