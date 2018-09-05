const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  addGroupBenefit,
  getGroupBenefitData
}

function addGroupBenefit (input, testDb) {
  const conn = testDb || connection
  return conn('group_benefit')
    .where('group_id', input.group_id)
    .select()
    .then(rows => {
      if (rows.length === 0) {
        return conn('group_benefit')
          .insert({
            pessimistic: input.data.pessimistic,
            optimistic: input.data.optimistic,
            likely: input.data.likely,
            chance_of_success: input.data.chance_of_success,
            group_id: input.group_id
          })
      } else {
        return rows
      }
    })
}

function getGroupBenefitData (input, testConn) {
  const conn = testConn || connection
  return conn('group_benefit')
    .where({
      group_id: input
    })
    .select('pessimistic', 'optimistic', 'likely', 'chance_of_success')
}
