import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    Message,
    Loader
} from 'semantic-ui-react';
import bitdb from '../lib/BitDB';
import setState from '../util/asyncSetState';
import DocumentStore from '../lib/DocumentStore';
import Ballot from '../lib/Ballot';

export default class BallotItem extends Component {
    static propTypes = {
        tx: PropTypes.any.isRequired,
    };

    state = {
        ballot: null,
        fetching: true,
        fetchError: null
    };

    componentDidMount(){
        this.fetchBallot().catch(console.error);
    }  

    fetchBallot = async () => {
        await setState(this, {
            ballot: null,
            fetching: true,
            fetchError: null
        });

        try {
            let ballot = await bitdb.getBallot(this.props.tx.tx.h);
    
            if(!ballot){
                throw new Error('Ballot not found!');
            }

            ballot = DocumentStore.linkLocalDocument(ballot);

            await setState(this, {
                ballot: DocumentStore.linkLocalDocument(ballot),
                fetching: false
            });
        } catch(err){
            await setState(this, {
                fetching: false,
                fetchError: err
            });
        }
    };

    render(){
        const ballot     = this.state.ballot
            , numOfCards = parseInt(this.props.tx.out[0].b10, 16);

        if(this.state.fetchError){
            return (
                <Table.Row>
                    <Table.Cell colSpan={3}>
                        <Message error>
                            <Message.Header>Unable to parse this ballot</Message.Header>
                            {String(this.state.fetchError)}
                        </Message>
                    </Table.Cell>
                    <Table.Cell>
                        {numOfCards}
                    </Table.Cell>
                </Table.Row>
            );
        }
        if(this.state.fetching){
            return (
                <Table.Row>
                    <Table.Cell colSpan={3}>
                        <Loader active inline='centered' />
                    </Table.Cell>
                    <Table.Cell>
                        {numOfCards}
                    </Table.Cell>
                </Table.Row>
            );
        }

        if(this.state.ballot.getExternalDocument()){
            return (
                <Table.Row>
                    <Table.Cell colSpan={3}>
                        <Message error>
                            <Message.Header>Ballot information is offchain. Please import the document in the 'Load offchain document' tab</Message.Header>
                            Hash: {String(this.state.ballot.getExternalDocument())}
                        </Message>
                    </Table.Cell>
                    <Table.Cell>
                        {numOfCards}
                    </Table.Cell>
                </Table.Row>
            );
        }

        const row = [
            <Table.Row>
                <Table.Cell rowSpan={ballot.getChoices().length}>{ballot.getTitle()}</Table.Cell>
                <Table.Cell>{ballot.getChoices()[0]}</Table.Cell>
                <Table.Cell rowSpan={ballot.getChoices().length}>{ballot.getEnd().toLocaleString()}</Table.Cell>
                <Table.Cell rowSpan={ballot.getChoices().length}>{numOfCards}</Table.Cell>
            </Table.Row>
        ];

        for(let i = 1; i < ballot.getChoices().length; i++){
            row.push(
                <Table.Row>
                    <Table.Cell>{ballot.getChoices()[i]}</Table.Cell>
                </Table.Row>
            );
        }

        return row;
    }
}