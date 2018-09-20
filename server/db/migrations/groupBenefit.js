exports.up = (knex, Promise) => {
  return knex.schema.createTable('group_benefit', (table) => {
    table.increments('id').primary()
    table.decimal('pessimistic')
    table.decimal('optimistic')
    table.decimal('likely')
    table.integer('chance_of_success')
    table.integer('group_id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('group_benefit')
}
