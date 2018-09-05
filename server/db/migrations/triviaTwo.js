exports.up = (knex, Promise) => {
  return knex.schema.createTable('trivia_two', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('lower_limit_one')
    table.integer('upper_limit_one')
    table.integer('lower_limit_two')
    table.integer('upper_limit_two')
    table.integer('lower_limit_three')
    table.integer('upper_limit_three')
    table.integer('lower_limit_four')
    table.integer('upper_limit_four')
    table.integer('lower_limit_five')
    table.integer('upper_limit_five')
    table.integer('brier_score')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('trivia_two')
}
