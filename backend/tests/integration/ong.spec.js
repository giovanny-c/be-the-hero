const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')


describe('ONG', () => {//nome do test

    let ongId = ""

    beforeAll(async () => {//antes do test vai

        
        //await connection.migrate.rollback('create_ongs', true)
        //await connection.migrate.rollback('create_incidents', true)//faz um rollback para nao acumular tabelas no banco de dados
        //NAO ESTA FUNCIONANDO, deletar o banco apos fazer o teste
        

        //PARA CRIAR UM NOVO RODAR COM ESSE CODIGO
        await connection.migrate.latest()//executar as migrations de criação do banco de dados de teste
        
    })

    afterAll(async () => {//depois do teste vai 

        await connection.destroy()//terminar a conexao com o banco de dados 

    })

    it('Should be able to create a new ONG', async () => {//descrição da funcionalidade do teste

        const response = await request(app) //chamando o app, que configura o server e usa as rotas
            .post('/ongs')//usando a rota '/ongs' pelo metodo post 
                .send({//enviando os dados 
                    name: "APAD2",
	                email: "contato@apad.com.br",
	                whatsapp: "74000000000",
                    city: "Rio do SUl",
                    uf: "SC"
                })

                

                ongId = response.body.id
                
                console.log(ongId)

                expect(response.body).toHaveProperty('id')//espera que retorne um id
                expect(response.body.id).toHaveLength(8)//espera esse id tenha 8 caracteres

    }),

    it('Should be able to create a new incident based on an determined ONG', async() => {

        const response = await request(app)
        .post('/incidents')
        .set('authorization', ongId )
        .send({

            title: "caso1",
            description: "asdasdasd",
            value: "200",
            

        })

        console.log(response.header.authorization)

        console.log(response.body)

        //expect(req.headers.authorization).toBe(ongId)
        expect(response.body).toHaveProperty('id')
        
        


    })

})