import { bfp } from 'bitcoinfiles';
import BITBOX from '../util/bitbox';
import { Buffer } from 'buffer';

export default class BitcoinFile {
    _data = new Buffer(0);
    _filename = '';
    _extension = '';

    setData(data) {
        if (!(data instanceof Buffer)) {
            throw new Error('data must be a Buffer');
        }

        this._data = data;
    }

    getData(){
        return this._data;
    }

    setName(name) {
        if (typeof name !== 'string') {
            throw new Error('name must be a string');
        }

        const dot = name.lastIndexOf('.');
        if (dot === -1) {
            this._filename = name;
            return;
        }

        this._filename = name.substring(0, dot);
        this._extension = name.substring(dot + 1);
    }

    getName() {
        return this._filename;
    }

    getExtension() {
        return this._extension;
    }

    estimateCost() {
        const fileName = this._filename;
        const fileExt = this._fileext;
        const fileSize = this._data.length
        const fileSha256Hex = this.getHash();

        let config = {
            msgType: 1,
            chunkCount: Math.ceil(fileSize / 220),
            fileName: fileName,
            fileExt: fileExt,
            fileSize: fileSize,
            fileSha256Hex: fileSha256Hex,
            prevFileSha256Hex: null,
            fileUri: null,
            chunkData: null
        };
        return bfp.calculateFileUploadCost(fileSize, config);
    }

    getHash() {
        return BITBOX.Crypto.sha256(this._data).toString('hex');
    }
}
