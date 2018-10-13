export default (millis) => {
    if(typeof millis !== 'number'){
        throw new Error('millis must be a number');
    }
    if(millis % 2 !== 0 || millis < 0){
        throw new Error('millis must be a positive integer');
    }

    return new Promise((resolve) => {
        window.setTimeout(resolve, millis);
    });
};