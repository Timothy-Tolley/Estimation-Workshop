const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  addUser,
  getUsers,
  getGroup,
  getEmail,
  updateEmailPrefs
}

function getUsers (testDb) {
  const db = testDb || connection
  return db('users').select()
}

function addUser (input, testDb) {
  const conn = testDb || connection
  return conn('users')
    .returning('user_id')
    .insert({
      name: input.name,
      email: input.email,
      group_id: input.group_number
    })
}

function getGroup (input, testConn) {
  const conn = testConn || connection
  return conn('users')
    .where({
      user_id: input
    })
    .select('group_id')
}

function getEmail (input, testConn) {
  const conn = testConn || connection
  return conn('users')
    .where({
      user_id: input
    })
    .select('email', 'work_email')
}

function updateEmailPrefs (id, input, testConn) {
  const conn = testConn || connection
  if (input.correctCheck === 'No') {
    return conn('users')
      .where({
        user_id: id
      })
      .update({
        email: input.updateEmail
      })
  } else {
    return conn('users')
      .where({
        user_id: id
      })
      .select()
  }
}
