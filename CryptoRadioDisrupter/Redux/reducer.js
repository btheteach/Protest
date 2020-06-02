import {
    GENERATE_SEED,
    ADD_GROUP,
    REMOVE_GROUP,
    FAIL_TO_CREATE_SEED
} from './actions'

const reducer = ( state = {
    error: {},
    clusters: []
}, action ) => {
    switch (action.type) {
        case ( GENERATE_SEED || ADD_GROUP ):
            return { 
                ...state, 
                clusters: state.clusters.push(action.seed)
            }
        case REMOVE_GROUP: 
            return {
                ...state,
                clusters: state.clusters.filter(s => s !== action.seed)
            }
        case FAIL_TO_CREATE_SEED:
            return { ...state, error: action.error}
        default:
            return state
    }
};

export default clustersReducer = reducer;
