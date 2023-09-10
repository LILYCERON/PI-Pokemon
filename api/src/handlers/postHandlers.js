const { createPokeDB } = require("../controllers/pokemonsController")

const createPosthandler = async (req, res) => {

    const { name, id, image, life, attack, defense, speed, height, weight, pokemonTypes } = req.body

    try {
        const response = await createPokeDB(name, id, image, life, attack, defense, speed, height, weight, pokemonTypes)
        res.json(response)
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    createPosthandler
}