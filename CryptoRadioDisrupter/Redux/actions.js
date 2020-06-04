import { NativeModules } from 'react-native'
const { RNRandomBytes } = NativeModules

export const GENERATE_SEED = 'GENERATE_SEED'
export const ADD_GROUP = 'ADD_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const FAIL_TO_CREATE_SEED = 'FAIL_TO_CREATE_SEED'
export const ADD_CARD = 'ADD_CARD'

export const generateSeed = seed => (
    { type: GENERATE_SEED, seed }
);

export const addGroup = seed => (
    { type: ADD_GROUP, seed }
);

export const removeGroup = seed => (
    { type: REMOVE_GROUP, seed }
);

export const failCreateSeed = error => (
    { type: FAIL_TO_CREATE_SEED, error }
)

export const addCard = card => ({
    type: ADD_CARD,
    payload: { name: card.name, interval: card.interval },
});

export function createSeed() {
    return function async(dispatch) {
        const rand = RNRandomBytes.randomBytes(256).toString('base64')

        return dispatch(generateSeed(rand))
    }
}
