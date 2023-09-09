import { GET_POKEMONS } from "../actions";

let inicialState = {
    Pokemons: [],
    PokeCopy: [],
    Post: [],
}

function rootReducer(state = inicialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                Pokemons: action.payload,
                PokeCopy: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;