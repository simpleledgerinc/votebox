import BITBOX from './bitbox';
import { Buffer } from 'buffer';
import { toSlpAddress } from 'slpjs/lib/utils';

export const deriveRedeemScript = function (choice, end) {
    if (typeof choice !== 'number') {
        throw new Error('choice must be a number');
    }
    if (choice < 0 || choice % 1 !== 0) {
        throw new Error('choice must be a positive integer');
    }
    if (!(end instanceof Date)) {
        throw new Error('end must be a date');
    }
    if (isNaN(end)) {
        throw new Error('end is not a valid date');
    }

    const redeemScript = [];
    if (choice === 0) {
        redeemScript.push(0x00); // OP_0
    } else {
        redeemScript.push(
            Buffer.from(choice.toString(16).padStart(2, '0'), 'hex')
        );
    }

    redeemScript.push(0x75); // OP_DROP

    // OP_PUSHDATA [end in ]
    redeemScript.push(
        Buffer.from(
            Math.floor(end.getTime() / 1000)        // end to unix timestamp
                .toString(16).padStart(16, '0')     // unix timestamp to hex (with padding)
                .match(/.{2}/g).reverse().join(''), // reverse (big endian -> little endian)
            'hex'
        )
    );

    redeemScript.push(0xb1); // OP_HODL

    let script = BITBOX.Script.encode(redeemScript);

    console.log(redeemScript);
    console.log(script);

    return script;
}

export default function (choice, end) {
    const redeemScript = deriveRedeemScript(choice, end)
        , scriptHash = BITBOX.Crypto.hash160(redeemScript)
        , scriptPubKey = BITBOX.Script.scriptHash.output.encode(scriptHash)
        , cashAddr = BITBOX.Address.fromOutputScript(scriptPubKey);

    return toSlpAddress(cashAddr);
}