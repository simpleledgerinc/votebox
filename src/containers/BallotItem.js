import React, { Component } from 'react';
import {
    Table,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import bitdb from '../lib/bitdb';

export default class BallotItem extends Component {
    state = {
        info: null,
    };

    async componentDidMount(){
        try {
            const info = await bitdb.ballotInfo(this.props.file);
            this.setState({ info });
        } catch(err) {
            console.error(err);
        }
    }  

    render(){
        if(this.state.info === null){
            return (
                <Table.Row>
                    <Table.Cell colSpan={2}>
                        <Loader active inline='centered' />
                    </Table.Cell>
                </Table.Row>
            );
        }

        const row = [
            <Table.Row>
                <Table.Cell rowSpan={this.state.info['vote-choices'].length}>{this.state.info['vote-name']}</Table.Cell>
                <Table.Cell>{this.state.info['vote-choices'][0].name}</Table.Cell>
            </Table.Row>
        ];

        for(let i = 1; i < this.state.info['vote-choices'].length; i++){
            row.push(
                <Table.Row>
                    <Table.Cell>{this.state.info['vote-choices'][i].name}</Table.Cell>
                </Table.Row>
            );
        }

        return row;
    }
}