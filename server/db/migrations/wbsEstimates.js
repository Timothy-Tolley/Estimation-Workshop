exports.up = (knex, Promise) => {
  return knex.schema.createTable('wbs_estimates', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.decimal('pessimistic_one')
    table.decimal('optimistic_one')
    table.decimal('likely_one')
    table.decimal('pessimistic_two')
    table.decimal('optimistic_two')
    table.decimal('likely_two')
    table.decimal('pessimistic_three')
    table.decimal('optimistic_three')
    table.decimal('likely_three')
    table.decimal('pessimistic_four')
    table.decimal('optimistic_four')
    table.decimal('likely_four')
    table.decimal('pessimistic_five')
    table.decimal('optimistic_five')
    table.decimal('likely_five')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('wbs_estimates')
}
