const { info, error } = require("console")
const { createPokeDB, getPokById } = require("../controllers/pokemonsController")
const axios = require('axios')
const { url } = require("inspector")
const { json } = require("sequelize")
const { response } = require("express")

//Obtiene todos los pokemons o los similares al nombre buscado

const pokemonsGethandler = (req, res) => {

    const name = req.query.name

        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=155')
            .then(
                (response) => {
                    const links = [];
                    response.data.results.map((obj) => links.push(obj.url))
                    const promises = links.map((link) => axios(link).then((response) => response.data))
                    
                    Promise.all(promises)
                        .then(results => {
                            const dataPokemons = results.map((infoPoke) => {
                                return ({
                                    id: infoPoke.id,
                                    name: infoPoke.name,
                                    image: infoPoke.sprites.other.dream_world.front_default,
                                    life: infoPoke.stats[0].base_stat,
                                    attack: infoPoke.stats[1].base_stat,
                                    defense: infoPoke.stats[4].base_stat,
                                    speed: infoPoke.stats[5].base_stat,
                                    height: infoPoke.height,
                                    weight: infoPoke.weight
                                })
                            })

                            if(name){
                                const pokSimilary= dataPokemons.filter((ob)=> {
                                  return (ob.name).includes(name.toLowerCase())})
                                res.send(pokSimilary)
                            }else{
                                res.send(dataPokemons)
                            }
                        })
                }
            ).catch(error => console.error(error.message))

}

//Obtiene el pokemon especificado en la busqueda por medio de id

const pokemonsDetailhandler = async (req, res) => {

    const infoId = req.params.id
    console.log(infoId)
    const source = isNaN(infoId) ? "bdd" : "api"
    console.log(source)

    try {
        const id = parseInt(infoId)
        const response = await getPokById(id, source);
        res.json(response)

    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    pokemonsGethandler,
    pokemonsDetailhandler
}