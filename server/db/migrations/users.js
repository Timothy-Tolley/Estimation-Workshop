exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary()
    table.string('name')
    table.string('email')
    table.string('work_email')
    table.integer('group_id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
