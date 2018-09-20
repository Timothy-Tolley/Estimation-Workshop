exports.up = (knex, Promise) => {
  return knex.schema.createTable('individual_cost', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.decimal('pessimistic')
    table.decimal('optimistic')
    table.decimal('likely')
    table.integer('group_id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('individual_cost')
}
