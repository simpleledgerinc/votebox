import BitcoinFile from './BitcoinFile';
import Token from './Token';
import { bitbox } from 'slpjs';
import deriveAddress from '../util/deriveAddress';
import _ from 'lodash';
import { Buffer } from 'buffer';
import BitDB from './BitDB';

const VERSION = 0
    , VALIDITY_AFTER_END = 60 * 60 * 24 * 90; // 3 months

export default class Ballot {
    _token    = new Token();
    _title    = '';
    _choices  = [];
    _end      = new Date(0);
    _receiver = '';

    constructor(){
        this._token.setName('');
        this._token.setTicker('votebox.io');
        this._token.setDecimals(0);
        
        // Placeholder values
        this._token.setUrl('bitcoinfile:0000000000000000000000000000000000000000000000000000000000000000');
        this._token.setHash('0000000000000000000000000000000000000000000000000000000000000000');
    }

    setTitle(title){
        if(typeof title !== 'string'){
            throw new Error('Title must be a string');
        }

        this._title = title;
    }

    getTitle(){
        return this._title;
    }

    setChoices(choices){
        if(!Array.isArray(choices)){
            throw new Error('choices must be an array');
        }

        for(const choice of choices){
            if(typeof choice !== 'string'){
                throw new Error('choices must be an array of strings');
            }
        }

        this._choices = choices;
    }

    getChoices(){
        return this._choices;
    }

    getAddress(i){
        if(typeof i !== 'number'){
            throw new Error('i must be a number');
        }
        if(i < 0 || i >= this._choices.length){
            throw new Error('i must be in range');
        }
        if(i % 1 !== 0){
            throw new Error('i must be an integer');
        }

        let end = this.getEnd().getTime();
        end += VALIDITY_AFTER_END;
        return deriveAddress(i, new Date(end));
    }

    setEnd(end){
        if(!(end instanceof Date)){
            throw new Error('end must be a date');
        }

        this._end = end;
    }

    getEnd(){
        return this._end;
    }

    setReceiver(address){
        if(typeof address !== 'string'){
            throw new Error('address must be a string');
        }

        this._receiver = address;
    }

    getReceiver(){
        return this._receiver;
    }

    setQuantity(quantity){
        this._token.setInitialQuantity(quantity);
    }

    getQuantity(){
        return this._token.getInitialQuantity();
    }

    getDocumentLength(){
        return [
            1,                      // version byte
            this._title.length + 1, // 0-terminated title
            1,                      // number of choices
            this._choices.reduce((length, str) => length + str.length + 1, 0),  // string array (strings are 0-terminated)
            8                       // end date
        ].reduce((sum, value) => sum + value, 0);
    }

    getDocument(){
        const buffer = new Buffer(this.getDocumentLength());

        let i = 0;

        // write version
        buffer.writeUInt8(VERSION, i);
        i++;

        // write title with 0-termination
        buffer.write(this._title, i, i + this._title.length + 1, 'utf-8');
        i += this._title.length + 1;

        // write number of choices
        buffer.writeUInt8(this._choices.length, i);
        i++;

        // write every choice with 0-termination
        for(const choice of this._choices){
            buffer.write(choice, i, i + choice.length + 1, 'utf-8');
            i += choice.length + 1;
        }

        // write end date
        buffer.write(this._end.getTime().toString(16).padStart(16, '0'), i, i + 8, 'hex');
        i += 8;

        return buffer;
    }

    getToken(){
        return this._token;
    }

    getBitcoinFile(){
        const file  = new BitcoinFile();

        file.setName('token.json');
        file.setData(this.getDocument());

        return file;
    }

    estimateCost(){
        const file  = this.getBitcoinFile();
        return file.estimateCost() + this._token.estimateCost();
    }

    static fromBuffer(buffer){
        if(!(buffer instanceof Buffer)){
            throw new Error('buffer is not a Buffer');
        }

        let i = 0;

        // read version
        const version = buffer.readUInt8(VERSION, i);
        if(version !== VERSION){
            throw new Error('Unknown version');
        }
        i++;

        // read title with 0-termination
        let title = '';
        while(true){
            const c = buffer.readUInt8(i);
            i++;

            if(c === 0x00)
                break;
            
            title += String.fromCharCode(c);
        }

        // read number of choices
        const numChoices = buffer.readUInt8(i);
        i++;

        // read every choice with 0-termination
        const choices = [];
        for(let x = 0; x < numChoices; x++){
            let choice = '';
            while(true){
                const c = buffer.readUInt8(i);
                i++;

                if(c === 0x00)
                    break;
                
                choice += String.fromCharCode(c);
            }
            choices.push(choice);
        }

        // read end date
        let time = 0;
        for(let x = 0; x < 8; x++){
            const c = buffer.readUInt8(i);
            time += 256 ** (7 - x) * c;
            i++;
        }

        if(i !== buffer.length){
            throw new Error('Invalid buffer length');
        }

        const ballot = new Ballot();
        ballot.setTitle(title);
        ballot.setChoices(choices);
        ballot.setEnd(new Date(time));
        return ballot;
    }

    static async getActiveBallots(address){
        const balances = await bitbox.getAllTokenBalances(address);
        const tokenIds = Object.keys(balances).filter(val => val.length === 64);

        const ballots = []
            , chunks  = _.chunk(tokenIds, 5);
        for(const tokenIds of chunks){
            const ballotChunk = await Promise.all(tokenIds.map(tokenId => BitDB.getBallot(tokenId)));
            for(let i = 0; i < tokenIds.length; i++){
                ballots.push([tokenIds[i], ballotChunk[i], balances[tokenIds[i]]]);
            }
        }
        
        return ballots;
    }
}