exports.up = (knex, Promise) => {
  return knex.schema.createTable('individual_cost', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('pessimistic')
    table.integer('optimistic')
    table.integer('likely')
    table.integer('group_id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('individual_cost')
}
