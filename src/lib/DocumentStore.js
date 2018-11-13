import { Buffer } from 'buffer';

export default class DocumentStore {
    static getDocument(hash){
        const data = window.localStorage.getItem('file:' + hash);
        if(!data){
            return null;
        }

        return Buffer.from(data, 'hex');
    }

    static setDocument(hash, data){
        window.localStorage.setItem('file:' + hash, data.toString('hex'));
    }

    static listFiles(){
        const out = [];
        for(let i = 0; i < window.localStorage.length; i++){
            const key = window.localStorage.key(i);
            if(key.startsWith('file:')){
                const hash = key.substr(5);
                const doc = this.getDocument(hash);

                out.push([hash, doc]);
            }
        }
        return out;
    }
}