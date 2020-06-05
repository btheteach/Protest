import MersenneTwister from '../shared/MersenneTwister'
import { AsyncStorage } from 'react-native';

export const GENERATE_CLUSTER = 'GENERATE_CLUSTER'
export const ADD_CLUSTER = 'ADD_CLUSTER'
export const REMOVE_CLUSTER = 'REMOVE_CLUSTER'
export const FAIL_TO_CREATE_SEED = 'FAIL_TO_CREATE_SEED'

export const FAIL_TO_FETCH_LOCAL_DATA = 'FAIL_TO_FETCH_LOCAL_DATA'

export const generateCluster = cluster => (
    { type: GENERATE_CLUSTER, cluster }
);

export const addCluster = cluster => (
    { type: ADD_CLUSTER, cluster }
);

export const removeCluster = seedID => (
    { type: REMOVE_CLUSTER, seedID }
);

export const failCreateSeed = error => (
    { type: FAIL_TO_CREATE_SEED, error }
)

export const failLocalFetch = error => (
    { type: FAIL_TO_FETCH_LOCAL_DATA, error }
)

export function createSeed (cluster) {
    return async function (dispatch){
        const mt = new MersenneTwister()
        
        return dispatch(generateCluster({
            ...cluster,
            seedID: mt.int()
        }))
    }
}
