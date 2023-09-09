const { Router } = require('express');
const pokemonsRoute = Router();
const {pokemonsGethandler} = require('../handlers/pokemonsHandler')
const {pokemonsDetailhandler} = require('../handlers/pokemonsHandler');
const { createPosthandler } = require('../handlers/postHandlers');

pokemonsRoute.get('/', pokemonsGethandler)

pokemonsRoute.get('/:id', pokemonsDetailhandler)

pokemonsRoute.post('/', createPosthandler)

module.exports = {
    pokemonsRoute
}