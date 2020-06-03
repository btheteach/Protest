import { getRandomBytesAsync } from 'expo-random'

export const GENERATE_SEED = 'GENERATE_SEED'
export const ADD_GROUP = 'ADD_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const FAIL_TO_CREATE_SEED = 'FAIL_TO_CREATE_SEED'

export const generateCluster = seed => (
    { type: GENERATE_SEED, seed }
);

export const addCluster = seed => (
    { type: ADD_GROUP, seed }
);

export const removeGroup = seed => (
    { type: REMOVE_GROUP, seed }
);

export const failCreateSeed = error => (
    { type: FAIL_TO_CREATE_SEED, error }
)

export function createSeed (cluster) {
    return function async (dispatch){
        
        return getRandomBytesAsync(256)
            .then(bytes => {
                let seed = bytes.toString('base64')
                return dispatch(generateCluster({
                    ...cluster,
                    seed: seed
                }))
            })
            .catch(error => dispatch(failCreateSeed(error)))
    }
}
