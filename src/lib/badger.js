class BadgerWallet {
    constructor(web4bch){
        this.web4bch = web4bch;
    }

    hasInstalledBadger(){
        return !!this.web4bch;
    }

    isLoggedIn(){
        return typeof this.getAddress() === 'string';
    }

    getAddress(){
        return this.web4bch.bch.defaultAccount;
    }

    async getBalance(addr){
        if(typeof addr === 'undefined'){
            addr = this.getAddress();
        }
        if(typeof addr !== 'string'){
            throw new Error('Address must be a string');
        }

        return new Promise((resolve, reject) => {
            this.web4bch.bch.getBalance(addr, (err, amount) => {
                if(err){
                    return reject(err);
                }
                resolve(amount);
            });
        });
    }
}

export default new BadgerWallet(window.web4bch);
