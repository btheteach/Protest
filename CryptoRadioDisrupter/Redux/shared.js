export function generateHash(preHash) {
    return 1234
}


export function generateChannels(seed, timeInterval, rangeBegin,rangeEnd) {
    const d = new Date();
    let n = d.getTime();
    n = n - (n%timeInterval); //n rounded to lower bound of time interval
    let preHash = seed + n;

    let postHash1 = generateHash(preHash);
    let postHash2 = generateHash(preHash+1);
    let postHash3 = generateHash(preHash+2);

    let channel1 = (postHash1%(rangeEnd-rangeBegin))+rangeBegin;
    let channel2 = (postHash2%(rangeEnd-rangeBegin))+rangeBegin;
    let channel3 = (postHash3%(rangeEnd-rangeBegin))+rangeBegin;
}