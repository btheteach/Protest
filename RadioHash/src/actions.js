export const GENERATE_SEED = 'GENERATE_SEED'
export const ADD_GROUP = 'ADD_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'

export const generateSeed = seed => (
    { type: GENERATE_SEED, seed }
);

export const addGroup = seed => (
    { type: ADD_GROUP, seed }
);

export const removeGroup = seed => (
    { type: REMOVE_GROUP, seed }
);
