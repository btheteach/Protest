import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto'

const MILLISECONDS = 1000
const MINUTE_IN_MILLISECONDS = 60 * MILLISECONDS
const HOURS_IN_MILLISECONDS = 60 * MINUTE_IN_MILLISECONDS

export const TIME_INTERVAL = {
    THIRTY_SECONDS: 30 * MILLISECONDS,
    ONE_MINUTE: MINUTE_IN_MILLISECONDS,
    TWO_MINUTES: 2 * MINUTE_IN_MILLISECONDS,
    FIVE_MINUTES: 5 * MINUTE_IN_MILLISECONDS,
    TEN_MINUTES: 10 * MINUTE_IN_MILLISECONDS,
    FIFTEEN_MINUTES: 15 * MINUTE_IN_MILLISECONDS,
    TWENTY_MINUTES: 20 * MINUTE_IN_MILLISECONDS,
    THIRTY_MINUTES: 30 * MINUTE_IN_MILLISECONDS,
    HOUR: HOURS_IN_MILLISECONDS
}


const generateHash = async pre => {
    let first, second, third
    try {
        first = await digestStringAsync(
            CryptoDigestAlgorithm.SHA256,
            pre.toString()
        )
        second = await digestStringAsync(
            CryptoDigestAlgorithm.SHA256,
            (pre+1).toString()
        )
        third = await digestStringAsync(
            CryptoDigestAlgorithm.SHA256,
            (pre + 2).toString()
        )

        first = parseInt(first, 16)
        second = parseInt(second, 16)
        third = parseInt(third, 16)
        
        return { first, second, third}
    } catch (err) {
        console.log(`Failed to hash string with error: ${err}`)
    }
}

export function generateChannels(seed, timeInterval = TIME_INTERVAL.THIRTY_SECONDS, rangeBegin = 1,rangeEnd = 22) {
    const d = new Date();
    let n = d.getTime();
    n = n - (n%timeInterval); //n rounded to lower bound of time interval
    let preHash = seed + n;

    return generateHash(preHash)
        .then(postHash => {
            let convertToChannels = hash => Math.floor(((parseInt(hash))%(rangeEnd-rangeBegin))+rangeBegin)
            let channels = {
                first: convertToChannels(postHash.first),
                second: convertToChannels(postHash.second),
                third: convertToChannels(postHash.third)
            }
            return channels
        })
        .catch(error => {
            console.log(`Failed to generate hash with error: ${error}`)
        })
}