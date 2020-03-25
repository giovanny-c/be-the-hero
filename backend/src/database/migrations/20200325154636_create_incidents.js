
exports.up = function(knex) {

    return knex.schema.createTable('incidents', function(table){

        table.increments()//cria um id auto-increment pk
        
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()//float

        table.string('ong_id').notNullable()//id de relacionamento da ong com o caso
        
        table.foreign('ong_id').references('id').inTable('ongs')//cria o relacionamento do ong_id com a tabela ongs pelo ongs.id

    })
  
};

exports.down = function(knex) {

    return knex.schema.dropTable('incidents')
  
};
