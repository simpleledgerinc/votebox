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
            tableError: false
        }
        this.handleTableError = this.handleTableError.bind(this)
    }

    componentDidMount() {
        const { tokenId, ballot } = this.props
        this.setState({
            tokenId,
            ballot
        })
    }

    handleTableError(tableError) {
        this.setState({
            tableError
        })
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

    renderErrorMessage() {
        if (!this.state.tableError) return null
        return (
            <div>
                <Header style={{marginTop: '20px'}} as='h4' color='red'>Error: Vote Token Qunatity is less than distributionlist.</Header>
            </div>
        )
    }
    

    render() {
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
                <DistributionListTable onSubmit={() => {this.props.onSubmit()}} id={this.state.tokenId} voteTokenQuantity={ballot.getQuantity().toString(10)} handleTableErrorSubmit={this.handleTableError} />
                {this.renderErrorMessage()}
            </div>
        );
    }
}