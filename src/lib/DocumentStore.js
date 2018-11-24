import { Buffer } from 'buffer';
import Ballot from './Ballot';

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

    static linkLocalDocument(ballot){
        const hash = ballot.getExternalDocument()
        if(!hash)
            return ballot;

        const data = DocumentStore.getDocument(hash);
        const newBallot = Ballot.fromBuffer(data);
        newBallot.setQuantity(ballot.getQuantity());

        return newBallot;
    }
}