exports.up = (knex, Promise) => {
  return knex.schema.alterTable('wbs_estimates', table => {
    table.decimal('pessimistic_one').alter()
    table.decimal('optimistic_one').alter()
    table.decimal('likely_one').alter()
    table.decimal('pessimistic_two').alter()
    table.decimal('optimistic_two').alter()
    table.decimal('likely_two').alter()
    table.decimal('pessimistic_three').alter()
    table.decimal('optimistic_three').alter()
    table.decimal('likely_three').alter()
    table.decimal('pessimistic_four').alter()
    table.decimal('optimistic_four').alter()
    table.decimal('likely_four').alter()
    table.decimal('pessimistic_five').alter()
    table.decimal('optimistic_five').alter()
    table.decimal('likely_five').alter()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('wbs_estimates', table => {
    table.integer('pessimistic_one').alter()
    table.integer('optimistic_one').alter()
    table.integer('likely_one').alter()
    table.integer('pessimistic_two').alter()
    table.integer('optimistic_two').alter()
    table.integer('likely_two').alter()
    table.integer('pessimistic_three').alter()
    table.integer('optimistic_three').alter()
    table.integer('likely_three').alter()
    table.integer('pessimistic_four').alter()
    table.integer('optimistic_four').alter()
    table.integer('likely_four').alter()
    table.integer('pessimistic_five').alter()
    table.integer('optimistic_five').alter()
    table.integer('likely_five').alter()
  })
}
