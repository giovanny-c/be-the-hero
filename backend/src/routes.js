const express = require('express')

const OngController = require('./controllers/OngController')

const incidentController = require('./controllers/incidentController')

const ProfileController = require('./controllers/ProfileController')

const SessionController = require('./controllers/SessionController')



const routes = express.Router()


// LOGIN //

routes.post('/sessions', SessionController.create)//rota cria uma sessao para login

/* ONGS */
routes.get('/ongs', OngController.index) 


routes.post('/ongs' , OngController.create)


// PERFIL DE UMA ONG //

routes.get('/profile', ProfileController.index) 


/* CASOS */

routes.get('/incidents', incidentController.index) 


routes.post('/incidents', incidentController.create)

routes.delete('/incidents/:id', incidentController.delete) 

module.exports = routes