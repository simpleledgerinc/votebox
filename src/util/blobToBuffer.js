import { Buffer } from 'buffer';

export default function (blob, cb) {
    if (typeof Blob === 'undefined' || !(blob instanceof Blob)) {
        throw new Error('first argument must be a Blob')
    }
    if (typeof cb !== 'function') {
        throw new Error('second argument must be a function')
    }

    var reader = new FileReader()

    function onLoadEnd(e) {
        reader.removeEventListener('loadend', onLoadEnd, false)
        if (e.error) cb(e.error)
        else cb(null, Buffer.from(reader.result))
    }

    reader.addEventListener('loadend', onLoadEnd, false)
    reader.readAsArrayBuffer(blob)
}