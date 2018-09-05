const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  addIndividualCost,
  getOwnCostData,
  getGroupCostData
}

function addIndividualCost (input, testDb) {
  const conn = testDb || connection
  return conn('individual_cost')
    .insert({
      user_id: input.user_id,
      pessimistic: input.data.pessimistic,
      optimistic: input.data.optimistic,
      likely: input.data.likely,
      group_id: input.group_id
    })
}

function getOwnCostData (input, testConn) {
  const conn = testConn || connection
  return conn('individual_cost')
    .where({
      user_id: input
    })
    .select('pessimistic', 'optimistic', 'likely')
}

function getGroupCostData (input, testConn) {
  const conn = testConn || connection
  return conn('individual_cost')
    .where({
      group_id: input
    })
    .select('pessimistic', 'optimistic', 'likely')
}
