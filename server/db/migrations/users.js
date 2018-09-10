exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary()
    table.string('name')
    table.string('email')
    table.string('work_email')
    table.integer('group_id')
    table.boolean('completed_sign_up')
    table.boolean('completed_group_benefit')
    table.boolean('completed_individual_cost')
    table.boolean('completed_wbs')
    table.boolean('completed_trivia_one')
    table.boolean('completed_trivia_two')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
