const { info, error } = require("console")
const { createPokeDB, getPokById } = require("../controllers/pokemonsController")
const axios = require('axios')
const { url } = require("inspector")
const { json } = require("sequelize")
const { response } = require("express")
const { Pokemons, Type } = require("../db")

//Obtiene todos los pokemons o los similares al nombre buscado

const pokemonsGethandler = async (req, res) => {
    const name = req.query.name;

    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=155');
        const links = response.data.results.map((obj) => obj.url);
        const promises = links.map((link) => axios(link).then((response) => response.data));

        const results = await Promise.all(promises);

        const dataPokemons = results.map((infoPoke) => ({
            id: infoPoke.id,
            name: infoPoke.name,
            image: infoPoke.sprites.other.dream_world.front_default,
            life: infoPoke.stats[0].base_stat,
            attack: infoPoke.stats[1].base_stat,
            defense: infoPoke.stats[4].base_stat,
            speed: infoPoke.stats[5].base_stat,
            height: infoPoke.height,
            weight: infoPoke.weight,
            pokemonTypes: infoPoke.types.map(item => item.type.name),
            createdInDb: false
        }));

        const pokemonsDb = await Pokemons.findAll();
        const pokemonsArray = pokemonsDb.map((pokemon) => pokemon.toJSON());

        const allDataPokemons = dataPokemons.concat(pokemonsArray);

        if (name) {
            const pokSimilary = allDataPokemons.filter((ob) => ob.name.includes(name.toLowerCase()));
            res.send(pokSimilary);
        } else {
            res.send(allDataPokemons);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
};

const getPokemonByType = async (req, res) => {
    console.log('entrando el getType');
    const typeName = req.query.type;

    try {
        const type = await Type.findOne({
            where: { pokemonTypes: typeName }
        });

        if (!type) {
            return res.status(404).json({ message: "Tipo de Pokémon no encontrado" });
        }

        const pokemonsInDb = await type.getPokemons();
        
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=155');
        const links = response.data.results.map((obj) => obj.url);
        const promises = links.map((link) => axios(link).then((response) => response.data));

        const results = await Promise.all(promises);

        const dataPokemons = results.map((infoPoke) => ({
            id: infoPoke.id,
            name: infoPoke.name,
            image: infoPoke.sprites.other.dream_world.front_default,
            life: infoPoke.stats[0].base_stat,
            attack: infoPoke.stats[1].base_stat,
            defense: infoPoke.stats[4].base_stat,
            speed: infoPoke.stats[5].base_stat,
            height: infoPoke.height,
            weight: infoPoke.weight,
            pokemonTypes: infoPoke.types.map(item => item.type.name),
            createdInDb: false
        }));

        // Filtrar los Pokémon de la API externa por tipo
        const filteredApiPokemons = dataPokemons.filter((poke) => {
            /* const types = poke.pokemonTypes.map((type) => type.type.name); */
            return poke.pokemonTypes.includes(typeName.toLowerCase());
        });

        // Combinar los Pokémon de la base de datos y los de la API
        const allPokemons = pokemonsInDb.concat(filteredApiPokemons);

        if (allPokemons.length === 0) {
            return res.status(404).json({ message: "No se encontraron Pokémon de este tipo" });
        }

        res.json(allPokemons);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
};


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
    pokemonsDetailhandler,
    getPokemonByType
}