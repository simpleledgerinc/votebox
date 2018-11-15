import BITBOX from '../util/bitbox';
import { bfp, network } from 'bitcoinfiles';

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

    static async findUTXO(minAmount = 0){
        const addr = BrowserWallet.getAddress()
            , utxo = await BITBOX.Address.utxo(addr);
        return utxo.filter(out => out.satoshis >= minAmount)[0];
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
}

export default BrowserWallet;

