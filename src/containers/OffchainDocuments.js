import React, { Component } from 'react';
import {
    Input,
    Table
} from 'semantic-ui-react';
import blobToBuffer from '../util/blobToBuffer';
import DocumentStore from '../lib/DocumentStore';
import BITBOX from '../util/bitbox';
import Ballot from '../lib/Ballot';

export default class OffchainDocuments extends Component {
    state = {
        list: []
    };

    componentDidMount(){
        this.loadBallots();
    }

    loadBallots = () => {
        const list = [];
        for(const [hash, file] of DocumentStore.listFiles()){
            try {
                list.push({
                    hash,
                    file,
                    ballot: Ballot.fromBuffer(file)
                });
            } catch(err) {
                console.error(err);
            }
        }
        
        this.setState({ list });
    }

    handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if(e.target.readyState === FileReader.DONE){
                fetch(e.target.result)
                    .then(res => res.blob())
                    .then(blob => {
                        return new Promise((resolve, reject) => {
                            blobToBuffer(blob, (err, buffer) => {
                                if(err) return reject(err);
                                resolve(buffer);
                            });
                        });
                    })
                    .then(buf => {
                        const hash = BITBOX.Crypto.sha256(buf).toString('hex');
                        DocumentStore.setDocument(hash, buf);
                        this.loadBallots();
                    })
                    .catch(window.alert)
            }
        };
        reader.readAsDataURL(file);
    };

    renderList = () => (
        this.state.list.map((item, key) => (
            <Table.Row key={key}>
                <Table.Cell>
                    {item.hash}
                </Table.Cell>
                <Table.Cell>
                    {item.ballot.getTitle()}
                </Table.Cell>
            </Table.Row>
        ))
    );

    render(){
        return (
            <div>
                <Input type='file' onChange={this.handleChange} />
                <Table>
                    <Table.Row>
                        <Table.Cell>
                            <strong>Hash</strong>
                        </Table.Cell>
                        <Table.Cell>
                            <strong>Ballot title</strong>
                        </Table.Cell>
                    </Table.Row>
                    {this.renderList()}
                </Table>
            </div>
        );
    }
}