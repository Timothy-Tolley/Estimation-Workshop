const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)
const {brierScore} = require('brier-score')

module.exports = {

  getBrierOne,
  getBrierTwo,
  addBrierOne,
  addBrierTwo,
  getBothBriers,
  calcLimitBrier,
  calcTrueFalseBrier
}

function getBrierOne (input, testConn) {
  const conn = testConn || connection
  return conn('trivia_one')
    .where({
      user_id: input
    })
    .first('brier_score_total')
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
  const brierScoreOne = calcLimitBrier(input.data.question1.upper_limit, input.data.question1.lower_limit, '92')
  const brierScoreTwo = calcTrueFalseBrier(input.data.tf_two, 'False', input.data.conf_two)
  const brierScoreThree = calcLimitBrier(input.data.question3.upper_limit, input.data.question3.lower_limit, '172')
  const brierScoreFour = calcTrueFalseBrier(input.data.tf_four, 'False', input.data.conf_four)
  const brierScoreFive = calcLimitBrier(input.data.question5.upper_limit, input.data.question5.lower_limit, '3724')
  const brierScoreTotal = (brierScoreOne + brierScoreTwo + brierScoreThree + brierScoreFour + brierScoreFive) / 5
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

// the second parameter of the calcTrueFalse Brier function is either “True” or “False” (capitalised first letters).
function calcTrueFalseBrier (userSelection, expectation, confidence) {
  let correct = null
  if (userSelection === expectation) {
    correct = 1
  } else {
    correct = 0
  }
  return brierScore({
    probability: (confidence / 100),
    outcome: correct
  })
}

// The third parameter of the calcLimitBrier function is the correct answer
function calcLimitBrier (upper, lower, value) {
  let correct = null
  let lowerLimit = Number(lower)
  let upperLimit = Number(upper)
  if (value >= lowerLimit && value <= upperLimit) {
    correct = 1
  } else {
    correct = 0
  }
  return brierScore({
    probability: 0.95,
    outcome: correct
  })
}

function addBrierTwo (input, testConn) {
  const brierScoreOne = calcLimitBrier(input.data.question1.upper_limit, input.data.question1.lower_limit, '853')
  const brierScoreTwo = calcTrueFalseBrier(input.data.tf_two, 'True', input.data.conf_two)
  const brierScoreThree = calcLimitBrier(input.data.question3.upper_limit, input.data.question3.lower_limit, '24')
  const brierScoreFour = calcTrueFalseBrier(input.data.tf_four, 'False', input.data.conf_four)
  const brierScoreFive = calcLimitBrier(input.data.question5.upper_limit, input.data.question5.lower_limit, '37')
  const brierScoreTotal = (brierScoreOne + brierScoreTwo + brierScoreThree + brierScoreFour + brierScoreFive) / 5
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
