export default async function(self, newState){
    if(typeof self.setState !== 'function'){
        throw new Error('this.setState must be of type function');
    }

    return new Promise(resolve => {
        self.setState(newState, resolve);
    });
};