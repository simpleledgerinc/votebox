import React, { Component } from 'react';
import {
    Button,
    Table,
    Icon,
    Message,
    Header
} from 'semantic-ui-react';
import BitDB from '../lib/BitDB';
import Token from '../lib/Token';
import DistributionListTable from './components/DistributionListTable'

export default class AirdropPayWidget extends Component {
    constructor() {
        super()
        this.state = {
            tokenId: '',
            ballot: null,
            balances: [],
            fetching: true,
            fetchError: null,
            tableError: false
        }
    }

    componentDidMount() {
        const { tokenId } = this.props
        this.setState({
            tokenId
        })
        this.loadToken(tokenId).catch(console.error)
    }

    async loadToken(id) {
        await this.setState({
            ballot: null,
            balances: [],
            fetching: true,
            fetchingError: null
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
                ballot,
                balances,
                fetching: false
            })
        } catch(err){
            this.setState({
                fetching: false,
                fetchError: err,
            })
        }
    }

    renderTable() {
        const { ballot } = this.state;

        return (
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Vote Token ID:</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {this.state.tokenId}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <strong>Vote Token Name:</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {ballot.getTitle()}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <strong>Number of Vote Tokens to be distributed:</strong>
                        </Table.Cell>
                        <Table.Cell>
                            {ballot.getQuantity().toString(10)}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
    

    render() {
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

        const { ballot } = this.state;
        if(!ballot){
            return (
                <Message error>
                    Ballot not found
                </Message>
            );
        }

        return (
            <div className='PayWidget'>
                {this.renderTable()}
                <Header size='small' style={{width: '100%'}}>Edit Distribution List</Header>
                <br/>
                <DistributionListTable id={this.state.tokenId}/>
                <div style={{width: '100%', justifyContent: 'flex-end'}}>
                    <Button disabled={this.state.tableError} style={{marginTop: '20px'}} color='green'>Proceed to Airdrop</Button>
                </div>
            </div>
        );
    }
}