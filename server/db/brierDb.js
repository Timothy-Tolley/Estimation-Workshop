const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)
const {brierScore} = require('brier-score')

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
    .first('brier_score_total')
    // .select('brier_score_total')
}

function getBrierTwo (input, testConn) {
  const conn = testConn || connection
  return conn('trivia_two')
    .where({
      user_id: input
    })
    .first('brier_score_total')
}

function getBothBriers (input, testConn) {
  const conn = testConn || connection
  return conn('trivia_one')
    .where('trivia_one.user_id', input)
    .join('trivia_two as tTwo', 'trivia_one.user_id', 'tTwo.user_id')
    .select('tTwo.brier_score_total as brier2', 'trivia_one.brier_score_total as brier1')
}

function addBrierOne (input, testConn) {
  const brierScoreOne = Number(calcLimitBrier(input.data.question1.upper_limit, input.data.question1.lower_limit, '100'))
  const brierScoreTwo = Number(calcTrueFalseBrier(input.data.tf_two, 'True', input.data.conf_two))
  const brierScoreThree = Number(calcLimitBrier(input.data.question3.upper_limit, input.data.question3.lower_limit, '200'))
  const brierScoreFour = Number(calcTrueFalseBrier(input.data.tf_four, 'False', input.data.conf_four))
  const brierScoreFive = Number(calcLimitBrier(input.data.question5.upper_limit, input.data.question5.lower_limit, '300'))
  const brierScoreTotal = Number((brierScoreOne + brierScoreTwo + brierScoreThree + brierScoreFour + brierScoreFive) / 5)
  const conn = testConn || connection
  return conn('trivia_one')
    .insert({
      user_id: input.user_id,
      brier_score_one: brierScoreOne,
      brier_score_two: brierScoreTwo,
      brier_score_three: brierScoreThree,
      brier_score_four: brierScoreFour,
      brier_score_five: brierScoreFive,
      brier_score_total: brierScoreTotal
    })
}

function calcTrueFalseBrier (TF, exp, conf) {
  let correct = null
  if (TF === exp) {
    correct = 1
  } else {
    correct = 0
  }
  return brierScore({
    probability: (conf / 100),
    outcome: correct
  })
}

function calcLimitBrier (upper, lower, value) {
  let correct = null
  let lowerLimit = Number(lower)
  let upperLimit = Number(upper)
  if (value > lowerLimit && value < upperLimit) {
    correct = 1
  } else {
    correct = 0
  }
  return brierScore({
    probability: 0.9,
    outcome: correct
  })
}

function addBrierTwo (input, testConn) {
  const brierScoreOne = Number(calcLimitBrier(input.data.question1.upper_limit, input.data.question1.lower_limit, '100'))
  const brierScoreTwo = Number(calcTrueFalseBrier(input.data.tf_two, 'True', input.data.conf_two))
  const brierScoreThree = Number(calcLimitBrier(input.data.question3.upper_limit, input.data.question3.lower_limit, '200'))
  const brierScoreFour = Number(calcTrueFalseBrier(input.data.tf_four, 'False', input.data.conf_four))
  const brierScoreFive = Number(calcLimitBrier(input.data.question5.upper_limit, input.data.question5.lower_limit, '300'))
  const brierScoreTotal = Number((brierScoreOne + brierScoreTwo + brierScoreThree + brierScoreFour + brierScoreFive) / 5)
  const conn = testConn || connection
  return conn('trivia_two')
    .insert({
      user_id: input.user_id,
      brier_score_one: brierScoreOne,
      brier_score_two: brierScoreTwo,
      brier_score_three: brierScoreThree,
      brier_score_four: brierScoreFour,
      brier_score_five: brierScoreFive,
      brier_score_total: brierScoreTotal
    })
}
