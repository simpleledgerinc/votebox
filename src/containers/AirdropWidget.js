import React, { Component } from 'react';
import {
    Button,
    Progress,
    Divider
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BrowserWallet from '../lib/BrowserWallet';
import setState from '../util/asyncSetState';
import sleep from '../util/asyncSleep';

export default class UploadWidget extends Component {
    static propTypes = {
        ballot: PropTypes.any.isRequired
    };

    state = {
        uploadPercentage: 0,
        uploadError: null,
        uploadFileId: '',

        creationPercentage: 0,
        creationError: null,
        creationTokenId: ''
    }

    componentDidMount(){
        this.uploadFile();
    }

    uploadFile = async () => {
        try {
            await setState(this, {
                uploadPercentage: 0,
                uploadError: null,
                uploadFileId: '',
            });

            const ballot = this.props.ballot
            , file   = ballot.getBitcoinFile();

            const fileId = await BrowserWallet.uploadBitcoinFile(file, (percentage) => {
                this.setState({
                    uploadPercentage: Math.floor(100 * percentage),
                    uploadError: null
                });
            });
            await setState(this, {
                uploadPercentage: 100,
                uploadFileId: fileId
            });

            await sleep(3000);
            await this.createToken();
        } catch(err){
            console.error(err);
            await setState(this, {
                uploadError: err
            });
        }
    };

    createToken = async () => {
        try {
            await setState(this, {
                creationPercentage: 0,
                creationError: null,
                creationTokenId: ''
            });

            const ballot = this.props.ballot
                , fileId = this.state.uploadFileId
                , hash   = ballot.getBitcoinFile().getHash();
    
            const token = ballot.getToken();
            token.setUrl(fileId);
            token.setHash(hash);

            const tokenId = await BrowserWallet.createToken(token, ballot.getReceiver());
            if(tokenId.length !== 64 || tokenId.split('').filter(c => !'0123456789abcdef'.includes(c)).length > 0){
                throw new Error(tokenId);
            }

            await setState(this, {
                creationPercentage: 100,
                creationTokenId: tokenId,
            });
        } catch(err){
            console.error(err);
            await setState(this, {
                creationError: err
            });
        }
    };

    render(){
        return (
            <div>
                <Progress percent={this.state.uploadPercentage} success={this.state.uploadPercentage === 100} error={!!this.state.uploadError}>
                    {this.state.uploadPercentage === 100 && 'File upload was successful'}
                    {this.state.uploadPercentage === 100 && <br />}
                    {this.state.uploadPercentage === 100 && this.state.uploadFileId}
                    {this.state.uploadError && 'File upload failed: ' + String(this.state.uploadError)}
                </Progress>
                <Button disabled={!this.state.uploadError} onClick={this.uploadFile}>Retry file upload</Button>

                <Divider />

                <Progress percent={this.state.creationPercentage} success={this.state.creationPercentage === 100} error={!!this.state.creationError}>
                    {this.state.creationPercentage === 100 && 'Token creation was successful'}
                    {this.state.creationPercentage === 100 && <br />}
                    {this.state.creationPercentage === 100 && this.state.creationTokenId}
                    {this.state.creationError && 'Token creation failed: ' + String(this.state.creationError)}
                </Progress>
                <Button disabled={!this.state.creationError} onClick={this.createToken}>Retry token creation</Button>
            </div>
        );
    }
}
