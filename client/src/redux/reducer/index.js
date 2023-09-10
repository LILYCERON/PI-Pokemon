import { GET_POKEMONS, GET_BY_NAME, GET_POKEMON_BY_ID, FILTERS, GET_TYPES, GET_POKEMONS_BY_TYPE } from "../actions";

let inicialState = {
    Pokemons: [],
    PokeCopy: [],
    pokemonTypes: [],
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
        case GET_BY_NAME:
            return {
                ...state,
                PokeCopy: action.payload
            }
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                PokeCopy: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                pokemonTypes: action.payload,
            };
        case GET_POKEMONS_BY_TYPE:
            return {
                ...state,
                PokeCopy: action.payload,
            };
        case FILTERS:
            const createFilte =
                action.payload === "created"
                    ? state.Pokemons.filter((db) => db.createdInDb)
                    : action.payload === "api"
                        ? state.Pokemons.filter((db) => !db.createdInDb)
                        : action.payload === "All"
                            ? state.Pokemons
                            : null;

            const sortedAr =
                action.payload === "asc"
                    ? state.Pokemons.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    })
                    : action.payload === "desc"
                        ? state.Pokemons.sort(function (a, b) {
                            if (a.name > b.name) {
                                return -1;
                            }
                            if (b.name > a.name) {
                                return 1;
                            }
                            return 0;
                        })
                        : null;

            const pokemonsByAttack =
                action.payload === "descp"
                    ? state.Pokemons.sort((a, b) => {
                        if (
                            parseInt(a.attack) -
                            parseInt(b.attack) <
                            0
                        )
                            return 1;
                        else return -1;
                    })
                    : action.payload === "ascp"
                        ? state.Pokemons.sort((a, b) => {
                            if (
                                parseInt(a.attack) -
                                parseInt(b.attack) >
                                0
                            )
                                return 1;
                            else return -1;
                        })
                        : null;


            const allFilter = createFilte
                ? createFilte
                : sortedAr
                    ? sortedAr
                    : pokemonsByAttack;
            return {
                ...state,
                PokeCopy: allFilter,
            };
        default:
            return state
    }
}

export default rootReducer;