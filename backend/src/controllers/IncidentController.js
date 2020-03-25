const crypto = require('crypto')

const connection = require('../database/connection')




module.exports = {

    async create(req, res){

        const { title, description, value } = req.body

        const ong_id = req.headers.authorization

        const [id] = await connection('incidents').insert({//faz a inserção e retorna o id
            title,
            description,
            value,
            ong_id

        }); //retorna um array com um só index, e pega o id desse index

        return res.json({id})

        

    },

    async index(req, res){

        const {page = 1} = req.query// se page nao tiver valor, entao = 1
        
        
        const [count] = await connection('incidents')//retorna um array com 1 index coma contagem
            .count()

     
        //PAGINAÇAO
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//relacionando as tebelas, pegatudo da tabela incidents onde o incidents.ong_id for igual ao ongs.id (id da ong)
            .limit(5)//quanto vai pegar
            .offset((page - 1) * 5)//apartir de  que registro 
            //se page = 1, offset = 0 (pega desde o 1º até o 5º registro), se p = 2, o = 5 (pega do 5º ao 10º)
            .select(['incidents.*', 
                     'ongs.name', 
                     'ongs.email', 
                     'ongs.city', 
                     'ongs.uf', 
                     'ongs.whatsapp'
                    ])
            
            
            res.header('X-Total-Count', count['count(*)'])
            //      nome do cabeçalho |objeto| nome do campo
            //passando o resultado de count para a header
            //da resposta

        return res.json(incidents)


    },

    async delete(req, res){

        const {id} = req.params

        const ong_id = req.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()//retorna o primeiro registro apena, como so vai ter um registro de resultado
            //db.query(`SELECT ong_id FROM incidents WHERE id = $1`, id, function(err, callback){})

        if(incident.ong_id != ong_id){
            return res.status(401).json({ error: 'Operation not permitted.'})//muda o status do codigo http para nao autorizado
                                 //200 é o padrao
        }

        await connection('incidents').where('id', id).delete()
        //deleta o caso

        return res.status(204).send()//204 resposta sem conteudo a retornar
                                     //send só pra retornar um resposta vazia

    }


}