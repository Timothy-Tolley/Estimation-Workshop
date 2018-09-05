const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getCostData
}

function getCostData (input, testConn) {
  const conn = testConn || connection
  return conn('wbs_estimates')
    .where({
      user_id: input
    })
    .select()
}
