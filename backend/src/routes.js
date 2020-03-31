const express = require('express')

const {celebrate, Segments, Joi} = require('celebrate')


const OngController = require('./controllers/OngController')

const incidentController = require('./controllers/incidentController')

const ProfileController = require('./controllers/ProfileController')

const SessionController = require('./controllers/SessionController')



const routes = express.Router()


// LOGIN //

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()

    })

}), SessionController.create)//rota cria uma sessao para login

/* ONGS */
routes.get('/ongs', OngController.index) 


routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(9999999999).max(99999999999),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),

    })
}),  OngController.create)


// PERFIL DE UMA ONG //

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
        

    


}), ProfileController.index) 


/* CASOS */

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })

}), incidentController.index) 


routes.post('/incidents', celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })

}), incidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
 

}),  incidentController.delete) 

module.exports = routes