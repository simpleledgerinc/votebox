const endpoint = 'https://tokengraph.network/';

class Tokengraph {
    constructor(apiKey) {
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('BitDB API key missing');
        }

        this._apiKey = apiKey;
    }

    async verify(){

    }
}

export default new Tokengraph('');