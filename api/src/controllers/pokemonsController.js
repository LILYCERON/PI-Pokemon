const axios = require('axios')
const { Pokemons, Type } = require('../db')

const createPokeDB = async (name, id, image, life, attack, defense, speed, height, weight, pokemonTypes) => {
    const newPoke = await Pokemons.create({ name, id, image, life, attack, defense, speed, height, weight, pokemonTypes })
    let pokemonDb = await Type.findAll({
        where: { pokemonTypes },
      });
      newPoke.addType(pokemonDb);
    return newPoke;
}


const getPokById = async (id, source) => {
    const Poke = source === "api" ?
    (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
        (response)=> {
            return response.data
        }
    ))
    : await Pokemons.findByPk(id)
    return Poke;
} 

module.exports = {

    createPokeDB,
    getPokById
}