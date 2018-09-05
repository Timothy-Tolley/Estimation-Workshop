exports.up = (knex, Promise) => {
  return knex.schema.createTable('group_benefit', (table) => {
    table.increments('id').primary()
    table.integer('pessimistic')
    table.integer('optimistic')
    table.integer('likely')
    table.integer('chance_of_success')
    table.integer('group_id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('group_benefit')
}
