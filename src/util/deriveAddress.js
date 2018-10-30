import BITBOX from './bitbox';
import { Buffer } from 'buffer';
import { toSlpAddress } from 'slpjs/lib/utils';

export const deriveRedeemScript = function(choice, end){
    if(typeof choice !== 'number'){
        throw new Error('choice must be a number');
    }
    if(choice < 0 || choice % 1 !== 0){
        throw new Error('choice must be a positive integer');
    }
    if(!(end instanceof Date)){
        throw new Error('end must be a date');
    }
    if(isNaN(end)){
        throw new Error('end is not a valid date');
    }

    const redeemScript = [];
    if(choice === 0){
        redeemScript.push(0x00); // OP_0
    } else {
        redeemScript.push(
            Buffer.from(choice.toString(16).padStart(2, '0'), 'hex')
        );
    }

    redeemScript.push(0x75); // OP_DROP

    redeemScript.push(
        Buffer.from(end.getTime().toString(16).padStart(16, '0'), 'hex') // OP_PUSHDATA [end]
    );

    redeemScript.push(0xb1); // OP_HODL

    return BITBOX.Script.encode(redeemScript);
}

export default function(choice, end){
    const redeemScript = deriveRedeemScript(choice, end)
        , scriptHash   = BITBOX.Crypto.hash160(redeemScript)
        , scriptPubKey = BITBOX.Script.scriptHash.output.encode(scriptHash)
        , cashAddr     = BITBOX.Address.fromOutputScript(scriptPubKey);

    return toSlpAddress(cashAddr);
}