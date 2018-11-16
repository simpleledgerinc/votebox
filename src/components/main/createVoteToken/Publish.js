import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Progress } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BrowserWallet from '../../../lib/BrowserWallet';
import sleep from '../../../util/asyncSleep';

const PButton = styled(Button)`
  min-width: 230px;
  margin-right: 30px!important;
  margin-bottom: 20px!important;
  float: left;
`;
const CProgress = styled(Progress)`
  margin-bottom: 20px!important;
`;
const StateDiv = styled.div`
  display: inline-block;
`;

export default class Publish extends Component {
    static propTypes = {
        ballot: PropTypes.any.isRequired
    };

    constructor() {
      super();

      this.state = {
        uploadPercentage: 0,
        uploadError: null,
        uploadFileId: '',

        creationPercentage: 0,
        creationError: null,
        creationTokenId: ''
      };
    }

    componentDidMount(){
        this.uploadFile();
    }

    uploadFile = async () => {
      try {
        this.setState({
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
        this.setState({
          uploadPercentage: 100,
          uploadFileId: fileId
        });

        await sleep(3000);
        await this.createToken();
      } catch(err){
        this.setState({
          uploadError: err
        });
      }
    };

    createToken = async () => {
      try {
        this.setState({
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

        this.setState({
          creationPercentage: 100,
          creationTokenId: tokenId,
        });
      } catch(err){
        this.setState({
          creationError: err
        });
      }
    };

    render() {
      return (
        <div>
          <CProgress percent={this.state.uploadPercentage} success={this.state.uploadPercentage === 100} error={!!this.state.uploadError}>
          </CProgress>
          <PButton disabled={!this.state.uploadError} onClick={this.uploadFile}>Retry file upload</PButton>
          <StateDiv>
            {this.state.uploadPercentage === 100 && 'File upload was successful'}
            {this.state.uploadPercentage === 100 && <br />}
            {this.state.uploadPercentage === 100 && this.state.uploadFileId}
            {this.state.uploadError && 'File upload failed: ' + String(this.state.uploadError)}
          </StateDiv>

          <CProgress style={{marginTop: '50px'}} percent={this.state.creationPercentage} success={this.state.creationPercentage === 100} error={!!this.state.creationError}>
          </CProgress>
          <PButton disabled={!this.state.creationError} onClick={this.createToken}>Retry token creation</PButton>
          <StateDiv>
            {this.state.creationPercentage === 100 && 'Token creation was successful'}
            {this.state.creationPercentage === 100 && <br />}
            {this.state.creationPercentage === 100 && this.state.creationTokenId}
            {this.state.creationError && 'Token creation failed: ' + String(this.state.creationError)}
          </StateDiv>
        </div>
      );
    }
}
