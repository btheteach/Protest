import { digestStringAsync, } from 'expo-crypto'

export function generateChannels(seed, timeInterval, rangeBegin,rangeEnd) {
    const d = new Date();
    let n = d.getTime();
    n = n - (n%timeInterval); //n rounded to lower bound of time interval
    let preHash = seed + n;

    let postHash = {
        first: generateHash(preHash),
        second: generateHash(preHash+1),
        third: generateHash(preHash+2)
    }
    
    let convertToChannels = hash => (hash%(rangeEnd-rangeBegin))+rangeBegin
    let channels = {
        first: convertToChannels(postHash.first),
        second: convertToChannels(postHash.second),
        third: convertToChannels(postHash.third)
    }

    return channels
}