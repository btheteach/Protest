import { getRandomBytesAsync } from 'expo-random'

export const GENERATE_CLUSTER = 'GENERATE_CLUSTER'
export const ADD_CLUSTER = 'ADD_CLUSTER'
export const REMOVE_CLUSTER = 'REMOVE_CLUSTER'
export const FAIL_TO_CREATE_SEED = 'FAIL_TO_CREATE_SEED'

export const generateCluster = cluster => (
    { type: GENERATE_CLUSTER, cluster }
);

export const addCluster = cluster => (
    { type: ADD_CLUSTER, cluster }
);

export const removeCluster = cluster => (
    { type: REMOVE_CLUSTER, cluster }
);

export const failCreateSeed = error => (
    { type: FAIL_TO_CREATE_SEED, error }
)

export function createSeed (cluster) {
    return async function (dispatch){
        
        return await getRandomBytesAsync(256)
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
