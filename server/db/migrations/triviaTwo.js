exports.up = (knex, Promise) => {
  return knex.schema.createTable('trivia_two', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.decimal('brier_score_one')
    table.decimal('brier_score_two')
    table.decimal('brier_score_three')
    table.decimal('brier_score_four')
    table.decimal('brier_score_five')
    table.decimal('brier_score_total')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('trivia_two')
}
