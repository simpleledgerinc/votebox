import { slp, bitdb } from 'slpjs';

export default function(utxos){
    // try to parse out SLP object from SEND or GENESIS txn type
    for(let txOut of utxos) {
        try {
            txOut.slp = slp.decodeTxOut(txOut);
        } catch(e) {
            if(e.message === "Possible mint baton"){
                txOut.baton = true;
            }
        }
    }
    
    return utxos;
}

