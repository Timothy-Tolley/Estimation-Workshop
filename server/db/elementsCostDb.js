const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  addElements,
  getCostData
}

function addElements (input, testDb) {
  const conn = testDb || connection
  return conn('wbs_estimates')
    .insert({
      user_id: input.user_id,
      pessimistic_one: input.data.pessimistic_one,
      optimistic_one: input.data.optimistic_one,
      likely_one: input.data.likely_one,
      pessimistic_two: input.data.pessimistic_two,
      optimistic_two: input.data.optimistic_two,
      likely_two: input.data.likely_two,
      pessimistic_three: input.data.pessimistic_three,
      optimistic_three: input.data.optimistic_three,
      likely_three: input.data.likely_three,
      pessimistic_four: input.data.pessimistic_four,
      optimistic_four: input.data.optimistic_four,
      likely_four: input.data.likely_four,
      pessimistic_five: input.data.pessimistic_five,
      optimistic_five: input.data.optimistic_five,
      likely_five: input.data.likely_five
    })
}

function getCostData (input, testConn) {
  const conn = testConn || connection
  return conn('wbs_estimates')
    .where({
      user_id: input
    })
    .select()
}
