import React, { Component } from 'react'
import {
    Table,
    Message,
    Header
} from 'semantic-ui-react'
import DistributionListTable from './components/DistributionListTable'
import './App.css'

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
            <div style={{display: 'block', width: '100%'}}>
                <a className='back-button' style={{marginTop: 0, marginBottom: '10px'}} onClick={() => {this.props.handleBack(2)}}>Go Back</a>
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
            </div>
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
                <Header size='small' style={{width: '100%', display: 'block'}}>
                    Edit Distribution List
                </Header>
                <br/>
                <DistributionListTable onSubmit={() => {this.props.onSubmit()}} id={this.state.tokenId} voteTokenQuantity={ballot.getQuantity().toString(10)} handleTableErrorSubmit={this.handleTableError} />
                {this.renderErrorMessage()}
            </div>
        );
    }
}