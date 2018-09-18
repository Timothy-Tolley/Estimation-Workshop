const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  addGroupBenefit,
  getGroupBenefitData
}

function chanceOfSuccessCheck (chance) {
  let charOne = String(chance).charAt(0)
  if (Number.isInteger(chance)) {
    return chance
  } else if (Number(charOne) === 0 && !Number.isInteger(chance)) {
    return chance * 100
  } else return Math.round(chance)
}

function addGroupBenefit (input, testDb) {
  const conn = testDb || connection
  const chance = chanceOfSuccessCheck(input.data.chance_of_success)
  const compPess = input.data.pessimistic * (chance / 100)
  const compOti = input.data.optimistic * (chance / 100)
  const compLike = input.data.likely * (chance / 100)
  return conn('group_benefit')
    .where('group_id', input.group_id)
    .select()
    .then(rows => {
      if (rows.length === 0) {
        return conn('group_benefit')
          .insert({
            pessimistic: compPess,
            optimistic: compOti,
            likely: compLike,
            chance_of_success: chance,
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
