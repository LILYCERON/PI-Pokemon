const axios = require('axios')
const { Pokemons } = require('../db')

const createPokeDB = async (name, id, image, life, attack, defense, speed, height, weight) => {
    const NewPoke = await Pokemons.create({ name, id, image, life, attack, defense, speed, height, weight })

    return NewPoke;
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