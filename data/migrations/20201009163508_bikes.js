exports.up = function(knex) {
    return knex.schema.createTable('bikes', tbl => {
        tbl.increments();
        tbl.string('make', 180).notNullable();
        tbl.string('model', 180).notNullable();
        tbl.integer('year');
    });
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('bikes')
};
