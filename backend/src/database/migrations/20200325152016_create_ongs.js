
exports.up = function(knex) {

   return knex.schema.createTable('ongs', function(table){

            table.string('id').primary();//gera um id como string por segurança, pra ser mais dificil de descobrir
            table.string('name').notNullable()
            table.string('email').notNullable()
            table.string('whatsapp').notNullable()
            table.string('city').notNullable()
            table.string('uf', 2).notNullable()

    })
  
};

exports.down = function(knex) {
    knex.schema.dropTable('ongs');
  
};
