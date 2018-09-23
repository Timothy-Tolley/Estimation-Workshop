exports.up = (knex, Promise) => {
  return knex.schema.alterTable('group_benefit', table => {
    table.decimal('pessimistic').alter()
    table.decimal('optimistic').alter()
    table.decimal('likely').alter()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('group_benefit', table => {
    table.integer('pessimistic').alter()
    table.integer('optimistic').alter()
    table.integer('likely').alter()
  })
}
