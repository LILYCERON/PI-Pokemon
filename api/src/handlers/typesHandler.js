const axios = require('axios')
const { getTypes } = require("../controllers/typesController")

const typesHandler = async (req, res) => {
    try {
        const apiTypes = await getTypes()
        res.send(apiTypes)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    typesHandler
}