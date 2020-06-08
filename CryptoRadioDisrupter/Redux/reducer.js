import {
    GENERATE_CLUSTER,
    ADD_CLUSTER,
    REMOVE_CLUSTER,
    FAIL_TO_CREATE_SEED,
    EMPTY_DATA,
    OPEN_REALM
} from './actions'

const createSeed = (state = {
    error: {},
    clusters: [],
    realm: {}
}, action) => {
    switch (action.type) {
        case ADD_CLUSTER:
        case EMPTY_DATA:
        case GENERATE_CLUSTER:
            return { 
                ...state, 
                clusters: state.clusters.concat(action.cluster)
            }
        case REMOVE_CLUSTER: 
            return {
                ...state,
                clusters: state.clusters.filter(c => c.seed !== action.seedID)
            }
        case FAIL_TO_CREATE_SEED:
            return { ...state, error: action.error }
        case OPEN_REALM:
            return {
                ...state,
                realm: action.realm
            }
        default:
            return state
    }
};

export default createSeed;
