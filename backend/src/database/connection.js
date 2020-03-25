const knex = require('knex')//knex e um  query builder

const configuration = require('../../knexfile')//arquivo com as configs de coneção

const connection = knex(configuration.development)//fazendo a conn usando as configs de conn de desenvolvimento

module.exports = connection