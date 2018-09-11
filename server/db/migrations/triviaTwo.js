exports.up = (knex, Promise) => {
  return knex.schema.createTable('trivia_two', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('brier_score_one')
    table.integer('brier_score_two')
    table.integer('brier_score_three')
    table.integer('brier_score_four')
    table.integer('brier_score_five')
    table.integer('brier_score_total')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('trivia_two')
}
