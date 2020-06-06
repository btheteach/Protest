import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto'

export const MILLISECONDS = 1000
export const MINUTE_IN_MILLISECONDS = 60 * MILLISECONDS
export const HOURS_IN_MILLISECONDS = 60 * MINUTE_IN_MILLISECONDS

export const TIME_INTERVAL = {
  THIRTY_SECONDS: 30 * MILLISECONDS,
  ONE_MINUTE: MINUTE_IN_MILLISECONDS,
  TWO_MINUTES: 2 * MINUTE_IN_MILLISECONDS,
  FIVE_MINUTES: 5 * MINUTE_IN_MILLISECONDS,
  TEN_MINUTES: 10 * MINUTE_IN_MILLISECONDS,
  FIFTEEN_MINUTES: 15 * MINUTE_IN_MILLISECONDS,
  TWENTY_MINUTES: 20 * MINUTE_IN_MILLISECONDS,
  THIRTY_MINUTES: 30 * MINUTE_IN_MILLISECONDS,
  ONE_HOUR: HOURS_IN_MILLISECONDS
}

export const standardizeTime = time => {
  if (!Number.isInteger) {
    return TIME_INTERVAL.THIRTY_SECONDS
  }

  switch (parseInt(time)) {
    case 1:
      return TIME_INTERVAL.ONE_MINUTE
    case 2:
      return TIME_INTERVAL.TWO_MINUTES
    case 5:
      return TIME_INTERVAL.FIVE_MINUTES
    case 10:
      return TIME_INTERVAL.TEN_MINUTES
    case 20:
      return TIME_INTERVAL.TWENTY_MINUTES
    case 30:
      return TIME_INTERVAL.THIRTY_MINUTES
    default:
      return TIME_INTERVAL.THIRTY_SECONDS
  }
}

export const getTimeout = (interval) => {
  let moment = new Date();
        let momentMilliseconds = (moment.getSeconds() * MILLISECONDS) + moment.getMilliseconds()

  if (interval !== TIME_INTERVAL.THIRTY_SECONDS) {
    moment += (moment.getMinutes() * MINUTE_IN_MILLISECONDS)
  }

  return interval - (momentMilliseconds % interval)
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
      (pre + 1).toString()
    )
    third = await digestStringAsync(
      CryptoDigestAlgorithm.SHA256,
      (pre + 2).toString()
    )

    first = parseInt(first, 16)
    second = parseInt(second, 16)
    third = parseInt(third, 16)

    return { first, second, third }
  } catch (err) {
    console.log(`Failed to hash string with error: ${err}`)
  }
}

export async function generateChannels (seed, timeInterval = TIME_INTERVAL.THIRTY_SECONDS, rangeBegin = 1, rangeEnd = 22) {
  const d = new Date()
    let n = d.getTime()
    n = n - (n % timeInterval) //n rounded to lower bound of time interval
    let preHash = seed + n

    return await generateHash(preHash)
    .then(postHash => {
      const convertToChannels = hash => Math.floor(((parseInt(hash)) % (rangeEnd - rangeBegin)) + rangeBegin)
      const channels = {
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
