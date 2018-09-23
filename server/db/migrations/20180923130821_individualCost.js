exports.up = (knex, Promise) => {
  return knex.schema.alterTable('individual_cost', table => {
    table.decimal('pessimistic').alter()
    table.decimal('optimistic').alter()
    table.decimal('likely').alter()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.alterTable('individual_cost', table => {
    table.integer('pessimistic').alter()
    table.integer('optimistic').alter()
    table.integer('likely').alter()
  })
}
