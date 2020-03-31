const knex = require('knex')//knex e um  query builder

const configuration = require('../../knexfile')//arquivo com as configs de coneção

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development
//ao executar npm test no console, 
//a variavel ambiente NODE_ENV tera o valor 'test'
//se executar  npm test, config = configuration.test
//se executar npm start, config = configuration.development


const connection = knex(config)//fazendo a conn usando as configs de conn de desenvolvimento ou de teste

module.exports = connection