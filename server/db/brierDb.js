const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getBothBriers,
  getBrierOne,
  getBrierTwo,
  addBrierOne,
  addBrierTwo
}

function getBrierOne (input, testConn) {
  const conn = testConn || connection
  return conn('trivia_one')
    .where({
      user_id: input
    })
    .select('brier_score')
}

function getBrierTwo (input, testConn) {
  const conn = testConn || connection
  return conn('trivia_two')
    .where({
      user_id: input
    })
    .select('brier_score')
}

function getBothBriers (input, testConn) {
  const conn = testConn || connection
  return conn('trivia_one')
    .join('trivia_two', 'user_id', '=', 'trivia_two.user_id')
    .where({
      user_id: input
    })
    .select('trivia_one.brier_score', 'trivia_two.brier_score')
}

function addBrierOne (input, testConn) {
  // const brierScore =
  const conn = testConn || connection
  return conn('trivia_one')
    .insert({
      user_id: input.user_id,
      lower_limit_one: input.data.question1.lower_limit,
      upper_limit_one: input.data.question1.upper_limit,
      lower_limit_two: input.data.question2.lower_limit,
      upper_limit_two: input.data.question2.upper_limit,
      lower_limit_three: input.data.question3.lower_limit,
      upper_limit_three: input.data.question3.upper_limit,
      lower_limit_four: input.data.question4.lower_limit,
      upper_limit_four: input.data.question4.upper_limit,
      lower_limit_five: input.data.question5.lower_limit,
      upper_limit_five: input.data.question5.upper_limit
      // brier_score: brierScore
    })
}

function addBrierTwo (input, testConn) {
  // const brierScore =
  const conn = testConn || connection
  return conn('trivia_two')
    .insert({
      user_id: input.user_id,
      lower_limit_one: input.data.question1.lower_limit,
      upper_limit_one: input.data.question1.upper_limit,
      lower_limit_two: input.data.question2.lower_limit,
      upper_limit_two: input.data.question2.upper_limit,
      lower_limit_three: input.data.question3.lower_limit,
      upper_limit_three: input.data.question3.upper_limit,
      lower_limit_four: input.data.question4.lower_limit,
      upper_limit_four: input.data.question4.upper_limit,
      lower_limit_five: input.data.question5.lower_limit,
      upper_limit_five: input.data.question5.upper_limit
      // brier_score: brierScore
    })
}
