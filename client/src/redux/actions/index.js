import axios from 'axios'

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID" 
export const GET_TYPES = "GET_TYPES"

export function getPokemons() {
    return async function (dispatch) {
        const response = await axios("http://localhost:3001/pokemons");
        return dispatch({
            type: GET_POKEMONS,
            payload: response.data
        })
    }
}

export function getByName(name) {
    return async function (dispatch) {
        const response = await axios(`http://localhost:3001/pokemons/?name=${name}`);
        return dispatch({
            type: GET_BY_NAME,
            payload: response.data
        })
    }
}

export function getPokemonById(id) {
    return async (dispatch) => {
      try {
        const detail = await axios.get(`http://localhost:3001/pokemons/${id}`);
        return dispatch({
          type: GET_POKEMON_BY_ID,
          payload: detail.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  }

  export function getTypes() {
    return async (dispatch) => {
      try {
        const info = await axios("http://localhost:3001/types");
        console.log(info.data)
        return dispatch({ type: GET_TYPES, payload: info.data });
      } catch (error) {
        console.log(error.message);
      }
    };
  }

  export function postPokemon(payload) {
    return async () => {
      try {
        const response = await axios.post("http://localhost:3001/pokemons/", payload);
        return response;
      } catch (error) {
        console.log(error.message);
      }
    };
  }