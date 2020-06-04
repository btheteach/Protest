import {
    GENERATE_CLUSTER,
    ADD_CLUSTER,
    REMOVE_CLUSTER,
    FAIL_TO_CREATE_SEED
} from './actions'

const reducer = ( state = {
    error: {},
    clusters: []
}, action ) => {
    switch (action.type) {
        case ( GENERATE_CLUSTER || ADD_CLUSTER ):
            return { 
                ...state, 
                clusters: state.clusters.concat(action.cluster)
            }
        case REMOVE_CLUSTER: 
            return {
                ...state,
                clusters: state.clusters.filter(c => c.seed !== action.seed)
            }
        case FAIL_TO_CREATE_SEED:
            return { ...state, error: action.error}
        default:
            return state
    }
};

export default clustersReducer = reducer;
