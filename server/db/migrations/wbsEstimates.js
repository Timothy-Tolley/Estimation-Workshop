exports.up = (knex, Promise) => {
  return knex.schema.createTable('wbs_estimates', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('pessimistic_one')
    table.integer('optimistic_one')
    table.integer('likely_one')
    table.integer('pessimistic_two')
    table.integer('optimistic_two')
    table.integer('likely_two')
    table.integer('pessimistic_three')
    table.integer('optimistic_three')
    table.integer('likely_three')
    table.integer('pessimistic_four')
    table.integer('optimistic_four')
    table.integer('likely_four')
    table.integer('pessimistic_five')
    table.integer('optimistic_five')
    table.integer('likely_five')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('wbs_estimates')
}
