import { utils } from 'slpjs';

const badger = window.web4bch && window.web4bch.bch;
class BadgerWallet {
    static hasInstalled(){
        return !!badger;
    }

    static getAddress(){
        return badger.defaultAccount;
    }

    static getSLPAddress(){
        const addr = this.getAddress();
        if(!addr)
            return addr;
        
        return utils.toSlpAddress(addr);
    }

    static isLoggedIn(){
        return this.hasInstalled() && !!this.getAddress();
    }

    static getBalance(addr){
        if(typeof addr === 'undefined'){
            addr = BadgerWallet.getAddress();
        }
        if(typeof addr !== 'string'){
            throw new Error('Address must be a string');
        }

        return new Promise((resolve, reject) => {
            badger.getBalance(addr, (err, amount) => {
                if(err){
                    return reject(err);
                }
                resolve(amount);
            });
        });
    }

    static send(addr, amount){
        if(typeof addr !== 'string'){
            throw new Error('Address must be a string');
        }
        if(typeof amount !== 'number'){
            throw new Error('Amount must be a number');
        }

        badger.sendTransaction({
            from: this.getAddress(),
            to: addr,
            value: amount
        }, (err, txId) => {
            if(err){
                console.error(err);
            } else {
                console.log('Badger transaction id:', txId);
            }
        });
    }
}

export default BadgerWallet;
