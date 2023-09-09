const { Router } = require('express');
const typesRoute = Router();
const { typesHandler } = require('../handlers/typesHandler');


typesRoute.get('/', typesHandler)

module.exports = {
    typesRoute
}