import BigNumber from 'bignumber.js';
import { slp, bitbox } from 'slpjs';

export const minQuantity = new BigNumber('0x0000000000000000', 16);
export const maxQuantity = new BigNumber('0xffffffffffffffff', 16);

export default class Token {
    _ticker = '';
    _name = '';
    _url = '';
    _hash = null;
    _decimals = 0;
    _initialQuantity = new BigNumber(0);

    setTicker(ticker){
        if(typeof ticker !== 'string'){
            throw new Error('ticker must be a string');
        }

        this._ticker = ticker;
    }

    setName(name){
        if(typeof name !== 'string'){
            throw new Error('name must be a string');
        }

        this._name = name;
    }

    setUrl(url){
        if(typeof url !== 'string'){
            throw new Error('url must be a string');
        }

        this._url = url;
    }

    setHash(hash){
        if(hash.length !== 64){
            throw new Error('hash length does not match 64');
        }

        for(const c of hash){
            if('0123456789abcdef'.indexOf(c) === -1){
                throw new Error('hash must be a 32-byte hex string');
            }
        }

        this._hash = hash;
    }

    setDecimals(decimals){
        if(typeof decimals !== 'number'){
            throw new Error('decimals must be a number');
        }

        if(!isFinite(decimals) || decimals % 2 !== 0 || decimals < 0 || decimals > 9){
            throw new Error('decimals must be an integer between 0x00 and 0x09');
        }

        this._decimals = decimals;
    }

    setInitialQuantity(quantity){
        if(!(quantity instanceof BigNumber)){
            throw new Error('quantity must be BigNumber');
        }

        if(quantity.isLessThan(minQuantity) || quantity.isGreaterThan(maxQuantity)){
            throw new Error('quantity must be a uint64 BigNumber');
        }

        this._initialQuantity = quantity;
    }

    getInitialQuantity(quantity){
        return this._initialQuantity;
    }

    buildOpReturn(withBaton = false){
        return slp.buildGenesisOpReturn({
            ticker: this._ticker,
            name: this._name,
            urlOrEmail: this._url,
            hash: this._hash, 
            decimals: this._decimals,
            batonVout: withBaton ? 2 : null,
            initialQuantity: this._initialQuantity,
        });
    }

    estimateCost(withBaton = false){   
        const opReturn = this.buildOpReturn(withBaton);
        return slp.calculateGenesisCost(opReturn.length, 1, withBaton ? true : null, true);
    }

    buildGenesisTx(utxo, wif, receiverAddress, batonAddress = null){
        return slp.buildRawGenesisTx({
            slpGenesisOpReturn: this.buildOpReturn(!!batonAddress), 
            mintReceiverAddress: receiverAddress,
            mintReceiverSatoshis: 546,
            batonReceiverAddress: batonAddress,
            batonReceiverSatoshis: 546,
            bchChangeReceiverAddress: receiverAddress, 
            input_utxos: [{
                txid: utxo.txid,
                vout: utxo.vout,
                satoshis: utxo.satoshis,
                wif: wif
            }]
        });
    }

    static async getBalance(tokenId, address){
        const balances = await bitbox.getAllTokenBalances(address);
        if(tokenId in balances){
            return balances[tokenId];
        }
        return new BigNumber(0);
    }
}