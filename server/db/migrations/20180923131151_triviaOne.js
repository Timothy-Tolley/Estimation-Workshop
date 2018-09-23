exports.up = (knex, Promise) => {
  return knex.schema.alterTable('trivia_one', table => {
    table.decimal('brier_score_one').alter()
    table.decimal('brier_score_two').alter()
    table.decimal('brier_score_three').alter()
    table.decimal('brier_score_four').alter()
    table.decimal('brier_score_five').alter()
    table.decimal('brier_score_total').alter()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('trivia_one', table => {
    table.integer('brier_score_one').alter()
    table.integer('brier_score_two').alter()
    table.integer('brier_score_three').alter()
    table.integer('brier_score_four').alter()
    table.integer('brier_score_five').alter()
    table.integer('brier_score_total').alter()
  })
}
