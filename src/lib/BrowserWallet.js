import BITBOX from '../util/bitbox';
import { bitbox as slpBB, slp, utils } from 'slpjs';
import { bfp, network } from 'bitcoinfiles';
import decodeSlp from '../util/decodeSlp';
import BigNumber from 'bignumber.js';

const LOCALSTORAGE_KEY = 'browserwallet';

class BrowserWallet {
    static getWIF(){
        let privKey = window.localStorage.getItem(LOCALSTORAGE_KEY);
        if(typeof privKey !== 'string'){
            const mnemonic   = BITBOX.Mnemonic.generate(128)
                , seedBuffer = BITBOX.Mnemonic.toSeed(mnemonic)
                , rootNode   = BITBOX.HDNode.fromSeed(seedBuffer)
                , node       = BITBOX.HDNode.derive(rootNode, 0)
                , keyPair    = BITBOX.HDNode.toKeyPair(node);

            privKey = BITBOX.ECPair.toWIF(keyPair);
            window.localStorage.setItem(LOCALSTORAGE_KEY, privKey);
        }
        return privKey;
    }

    static getKeyPair(){
        const wif = BrowserWallet.getWIF();
        return BITBOX.ECPair.fromWIF(wif);
    }

    static getAddress(){
        const keyPair = BrowserWallet.getKeyPair();
        return BITBOX.ECPair.toCashAddress(keyPair);
    }

    static getSLPAddress(){
        const addr = BrowserWallet.getAddress();
        return utils.toSlpAddress(addr);
    }

    static async findUTXO(minAmount = 0){
        const addr = BrowserWallet.getAddress()
            , utxo = await BITBOX.Address.utxo(addr);
        return utxo.filter(out => out.satoshis >= minAmount)[0];
    }

    static async findTokenUTXO(tokenId){
        let addr  = BrowserWallet.getAddress()
          , utxos = await slpBB.getUtxoWithTxDetails(addr);

        const decoded = decodeSlp(utxos);
        return decoded.filter(utxo => {
            return ('slp' in utxo) && utxo.slp.token === tokenId;
        });
    }

    static async uploadBitcoinFile(file, onProgressUpdate = null){
        const amount = file.estimateCost()
            , utxo   = await BrowserWallet.findUTXO(amount);

        const fileId = await bfp.uploadFile(
            utxo, BrowserWallet.getAddress(), BrowserWallet.getWIF(),
            file.getData(), file.getName(), file.getExtension(),
            null, null, BrowserWallet.getAddress(),
            null, null, onProgressUpdate, null
        );
        return fileId;
    }

    static async createToken(token, receiverAddress, batonAddress = null){
        const amount = token.estimateCost(!!batonAddress)
            , utxo   = await BrowserWallet.findUTXO(amount)
            , tx     = token.buildGenesisTx(utxo, BrowserWallet.getWIF(), receiverAddress, batonAddress)
            , txId   = await network.sendTx(tx);
        return txId;
    }

    static calculateSendTokenCost(numRecipients, inputs = 2){
        let fees = 546;

        while(numRecipients > 0){
            let outputs = (numRecipients > 18 ? 18 : numRecipients);
            numRecipients -= outputs;

            outputs++; // Token change
            if(numRecipients > 0){ // Change
                outputs++; // Satoshis
            }

            const outputQtyArray = [];
            for(let i = 0; i < outputs; i++){
                outputQtyArray.push(new BigNumber(0));
            }

            const opReturn = slp.buildSendOpReturn({
                tokenIdHex: "0000000000000000000000000000000000000000000000000000000000000000", 
                outputQtyArray
            });

            fees += slp.calculateSendCost(opReturn.length, inputs, outputs);

            inputs = 1;
        }
        return  fees;
    }

    static async sendToken(tokenId, recipients){
        console.log(recipients)

        const tokenInputs = await BrowserWallet.findTokenUTXO(tokenId);
        const fees = BrowserWallet.calculateSendTokenCost(recipients.length, 1 + tokenInputs.length);
        const feesInput = await BrowserWallet.findUTXO(fees);

        const transactions = []
            , inputs = [...tokenInputs, feesInput];

        let tokenAmount = tokenInputs.reduce((sum, i) => sum.plus(i.slp.quantity), new BigNumber(0));

        while(recipients.length > 0){
            const thisTxRecipients = [];
            for(let i = 0; i < 18; i++){
                const recp = recipients.shift();
                thisTxRecipients.push(recp);
            }

            const tokensInThisTx = thisTxRecipients.reduce((sum, r) => sum.plus(r.amount), new BigNumber(0));
            const change = tokenAmount.minus(tokensInThisTx);

            const sendOpReturn = slp.buildSendOpReturn({
                tokenIdHex: tokenId,
                outputQtyArray: [...thisTxRecipients.map(r => r.amount), change]
            });

            const tx = slp.buildRawSendTx({
                slpSendOpReturn: sendOpReturn,
                input_token_utxos: inputs.map(i => ({
                    txid: i.txid,
                    vout: i.vout,
                    satoshis: i.satoshis,
                    wif: BrowserWallet.getWIF(),
                })),
                tokenReceiverAddressArray: [...thisTxRecipients.map(r => r.address), BrowserWallet.getSLPAddress()],
                bchChangeReceiverAddress: BrowserWallet.getAddress(),
            });
            console.log(tx);

            return;
        }
    }
    
}

export default BrowserWallet;

