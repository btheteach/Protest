import {
    GENERATE_SEED,
    ADD_GROUP,
    REMOVE_GROUP
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
    }
};

export default clustersReducer = reducer;
