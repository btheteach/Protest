import {
    ADD_CARD
} from '../actions'

const INITIAL_STATE = {
    cards: [
        {
            id: '0',
            seedID: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            groupName: 'Group A',
            frequency: 420.55
        },
        {
            id: '1',
            seedID: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            groupName: 'Group B',
            frequency: 458.85
        },
        {
            id: '2',
            seedID: '58694a0f-3da1-471f-bd96-145571e29d72',
            groupName: 'Group C',
            frequency: 328.15
        }
    ]
};

const createCard = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CARD:
            let cardID = state.cards.length
            let card = {
                id: cardID,
                seedID: 'TO DO',
                groupName: action.payload.name,
                frequency: action.payload.interval
            }

            return { 
                ...state,
                cards: [...state.cards, card]
            }
        default:
            return state
    };
}

export default createCard;