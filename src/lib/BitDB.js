import { Buffer } from 'buffer';
import Ballot from './Ballot';
import BigNumber from 'bignumber.js';
import { bitdb } from 'slpjs';
import { toSlpAddress } from 'slpjs/lib/utils';

const endpoint = 'https://bitdb.network/q/';

class BitDB {
    constructor(apiKey) {
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('BitDB API key missing');
        }

        this._apiKey = apiKey;
    }

    async _query(query) {
        const queryBase64 = btoa(JSON.stringify(query));

        const res = await fetch(endpoint + queryBase64, {
            method: 'GET',
            headers: {
                'key': this._apiKey
            },
        });

        const json = await res.json();
        return json;
    }

    async getTokenBalances(tokenId, ignore=[]){
        let holders = await bitdb.getBalances(this._apiKey, tokenId);

        ignore.forEach(i => {
            holders = holders.filter((o) => { return toSlpAddress(o.address) !== i })
        });

        holders = holders.map((o) => { return {"address": toSlpAddress(o.address), "amount": o.amount }});

        return holders;
    }

    async getBallot(tokenId){
        const res = await this._query({
            v: 2,
            e: {
                'out.b10': 'hex'
            },
            q: {
                find: {
                    'tx.h': tokenId
                }
            }
        });

        if(res.unconfirmed.length < 1 && res.confirmed.length < 1){
            return null;
        }

        const tx = res.confirmed[0] || res.unconfirmed[0];

        if(!tx){
            return null;
        }

        const ballot = await this.getBallotInfo(tx.out[0].s6.substring(12));

        ballot.setQuantity(new BigNumber(tx.out[0].b10, 16));
        
        return ballot;
    }

    async getBallotInfo(fileId){
        const file = await this.readBitcoinFile(fileId)
            , buf  = Buffer.from(file, 'hex');

        return Ballot.fromBuffer(buf);
    }

    async getBallotList(offset = 0, limit = 20) {
        const response = await this._query({
            v: 2,
            e: {
                'out.b10': 'hex'
            },
            q: {
                find: {
                    'out.s1': 'SLP\x00',
                    'out.s3': 'GENESIS',
                    'out.s4': 'votebox.io'
                },
                limit
            }
        });
        return [].concat(response.confirmed).concat(response.unconfirmed);
    }

    async _readBitcoinFileMetadata(txId) {
        const res = await this._query({
            v: 2,
            e: {
                'out.b2': 'hex',
                'out.b3': 'hex',
                'out.b6': 'hex',
                'out.b7': 'hex',
                'out.b8': 'hex',
                'out.b10': 'hex'
            },
            q: {
                find: {
                    'tx.h': txId
                },
                limit: 1,
                project: {
                    _id: 0,
                    'in.e.h': 1,
                    'out.s1': 1,
                    'out.b2': 1,
                    'out.b3': 1,
                    'out.s4': 1,
                    'out.s5': 1,
                    'out.b6': 1,
                    'out.b7': 1,
                    'out.b8': 1,
                    'out.s9': 1,
                    'out.b10': 1
                }
            }
        });

        if(res.unconfirmed.length < 1 && res.confirmed.length < 1){
            return null;
        }

        const tx = res.confirmed[0] || res.unconfirmed[0];
        
        if(tx.out[0].s1 !== 'BFP\x00'){
            throw new Error('Wrong lokad id');
        }
        if(tx.out[0].b2 !== '01'){
            throw new Error('Not bfp_msg_type = 0x01');
        }
        if(tx.out[0].b3 === '00'){
            throw new Error('External file');
        }
        
        return {
            prevChunk: tx.in[0].e.h,
            filename: tx.out[0].s4 + tx.out[0].s5,
            chunks: parseInt(tx.out[0].b3, 16),
            data: tx.out[0].b10
        };
    }

    async _readBitcoinFileChunk(txId){
        const res = await this._query({
            v: 2,
            e: {
                'out.b1': 'hex'
            },
            q: {
                find: {
                    'tx.h': txId
                },
                limit: 1,
                project: {
                    _id: 0,
                    'in.e.h': 1,
                    'out.b1': 1
                }
            }
        });

        if(res.unconfirmed.length < 1 && res.confirmed.length < 1){
            return null;
        }

        const tx = res.confirmed[0] || res.unconfirmed[0];

        return {
            prevChunk: tx.in[0].e.h,
            data: tx.out[0].b1
        }
    }

    async readBitcoinFile(fileId) {
        const meta = await this._readBitcoinFileMetadata(fileId);

        let chunks = [meta]
          , counter = meta.chunks - 1;

        while(counter > 0) {
            const chunk = await this._readBitcoinFileChunk(chunks[0].prevChunk);
            chunks.unshift(chunk);

            counter--;
        };

        return chunks.map(c => c.data).join('');
    }
}

export default new BitDB('qqk90ufl3p59uk48r49j88n2kq52um7205f53z9wlc');