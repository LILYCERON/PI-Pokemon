const axios = require('axios')
const { Type } = require('../db')

const getTypes = async () => {
    const infoTypes = await axios.get(`https://pokeapi.co/api/v2/type`)
    const arrayTypes = infoTypes.data.results.map((type) => {
        return type.name       
    })
    return arrayTypes
} 

module.exports = {
    getTypes
}