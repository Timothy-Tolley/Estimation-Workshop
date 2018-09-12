const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  addUser,
  updateComplete,
  checkComplete,
  getGroup,
  getEmail,
  updateEmailPrefs
}

function checkComplete (input, testConn) {
  const conn = testConn || connection
  return conn('users')
    .where({
      user_id: input.user_id
    })
    .select(input.survey)
}

function addUser (input, testDb) {
  const conn = testDb || connection
  return conn('users')
    .returning('user_id')
    .insert({
      name: input.name,
      email: input.email,
      group_id: input.group_number,
      completed_sign_up: true,
      completed_group_benefit: false,
      completed_individual_cost: false,
      completed_wbs: false,
      completed_trivia_one: false,
      completed_trivia_two: false
    })
}

function updateComplete (input, testDb) {
  const conn = testDb || connection
  return conn('users')
    .where({
      user_id: input.user_id
    })
    .update({
      [input.survey]: true
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
  if (input.correctCheck === 'No' && input.workEmailCheck === 'Yes') {
    return conn('users')
      .where({
        user_id: id
      })
      .update({
        work_email: input.updateEmail,
        email: null
      })
  } else if (input.correctCheck === 'No' && input.workEmailCheck === 'No' && input.addEmailCheck === 'Yes') {
    return conn('users')
      .where({
        user_id: id
      })
      .update({
        email: input.updateEmail,
        work_email: input.addWorkEmail
      })
  } else if (input.correctCheck !== 'No' && input.workEmailCheck === 'No' && input.addEmailCheck === 'Yes') {
    return conn('users')
      .where({
        user_id: id
      })
      .update({
        work_email: input.addWorkEmail
      })
  } else if (input.correctCheck !== 'No' && input.workEmailCheck === 'Yes') {
    return conn('users')
      .where({
        user_id: id
      })
      .update({
        work_email: input.correctCheck,
        email: null
      })
  } else if (input.correctCheck === 'No' && input.workEmailCheck === 'No' && input.addEmailCheck === 'No') {
    return conn('users')
      .where({
        user_id: id
      })
      .update({
        work_email: null,
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
