import MersenneTwister from '../shared/MersenneTwister'
import { standardizeTime } from '../shared/shared'
import Realm from 'realm'

export const GENERATE_CLUSTER = 'GENERATE_CLUSTER'
export const ADD_CLUSTER = 'ADD_CLUSTER'
export const REMOVE_CLUSTER = 'REMOVE_CLUSTER'
export const FAIL_TO_CREATE_SEED = 'FAIL_TO_CREATE_SEED'
export const ADD_CARD = 'ADD_CARD'
export const EMPTY_DATA = 'EMPTY_DATA'

export const FAIL_TO_FETCH_LOCAL_DATA = 'FAIL_TO_FETCH_LOCAL_DATA'
export const OPEN_REALM = 'OPEN_REALM'
export const FAIL_TO_OPEN_REALM = 'FAIL_TO_OPEN_REALM'

const DataSchema = {
    name: 'Data',
    properties: {
        clusters: 'Clusters[]'
    }
}

const ClusterSchema = {
    name: 'Cluster',
    properties: {
        groupName: 'string',
        interval: 'int',
        seedID: 'string'
    }
}

export const generateCluster = cluster => (
    { type: GENERATE_CLUSTER, cluster }
);

export const addCluster = cluster => (
    { type: ADD_CLUSTER, cluster }
);

export const emptyData = () => (
    { type: EMPTY_DATA }
)

export const removeCluster = seedID => (
    { type: REMOVE_CLUSTER, seedID }
);

export const failCreateSeed = error => (
    { type: FAIL_TO_CREATE_SEED, error }
)

export const failLocalFetch = error => (
    { type: FAIL_TO_FETCH_LOCAL_DATA, error }
)

export const openRealm = realm => (
    { type: OPEN_REALM, realm }
)

export const failOpenRealm = error => (
    { type: FAIL_TO_OPEN_REALM, error }
)

export function createRealm () {
    return async function (dispatch) {
        const schemas = { schema: { DataSchema, ClusterSchema } }
        await Realm.open(schemas)
            .then(realm => dispatch(openRealm(realm)))
            .catch(error => {
                console.log(`Failed to open local realm with error: ${error}`)
                dispatch(failOpenRealm(error))
            })
    }
}

export function fetchLocalData (realm) {
    return async function (dispatch) {
        const data = await realm.objects('Data')
        const action = data.length ? addCluster(data[0]) : emptyData()
        return dispatch(action)
    }
}

export function createSeed (cluster) {
    return async function (dispatch){
        const mt = new MersenneTwister()
        
        return dispatch(generateCluster({
            ...cluster,
            interval: standardizeTime(cluster.interval),
            seedID: mt.int()
        }))
    }
}
