/* global test expect beforeEach afterEach */
const testEnv = require('./test-environment')

const db = require('../../../server/db/brierDb')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

// getBrierOne data

test('getBrierOne gets trivia one brier', () => {
  const expected = 0.6
  const id = 4
  return db.getBrierOne(id, testDb)
    .then(data => {
      const actual = data.brier_score_total
      expect(actual).toBe(expected)
    })
})

// getBrierTwo data

test('getBrierTwo gets trivia two brier', () => {
  const expected = 0.6
  const id = 6
  return db.getBrierTwo(id, testDb)
    .then(data => {
      const actual = data.brier_score_total
      expect(actual).toBe(expected)
    })
})

// getBothbriers data

test('getBothBriers gets both brier scores', () => {
  const expected1 = 0.4
  const expected2 = 0.6
  const id = 6
  return db.getBothBriers(id, testDb)
    .then(data => {
      const actual1 = data[0].brier1
      const actual2 = data[0].brier2
      expect(actual1).toBe(expected1)
      expect(actual2).toBe(expected2)
    })
})

// addBriers

test('addBrierOne adds new brier scores to trivia one table', () => {
  const expected = 0.009999999999999995
  const id = 10
  const input = {
    user_id: 10,
    data: {
      question1: {
        upper_limit: 120,
        lower_limit: 10
      },
      tf_two: 'True',
      conf_two: 90,
      question3: {
        upper_limit: 300,
        lower_limit: 10
      },
      tf_four: 'False',
      conf_four: 90,
      question5: {
        upper_limit: 400,
        lower_limit: 10
      }
    }
  }
  return db.addBrierOne(input, testDb)
    .then(users => {
      return db.getBrierOne(id, testDb)
    })
    .then(data => {
      const actual = data.brier_score_total
      expect(actual).toBe(expected)
    })
})

test('addBrierTwo adds new brier scores to trivia one table', () => {
  const expected = 0.009999999999999995
  const id = 10
  const input = {
    user_id: 10,
    data: {
      question1: {
        upper_limit: 120,
        lower_limit: 10
      },
      tf_two: 'True',
      conf_two: 90,
      question3: {
        upper_limit: 300,
        lower_limit: 10
      },
      tf_four: 'False',
      conf_four: 90,
      question5: {
        upper_limit: 400,
        lower_limit: 10
      }
    }
  }
  return db.addBrierTwo(input, testDb)
    .then(users => {
      return db.getBrierTwo(id, testDb)
    })
    .then(data => {
      const actual = data.brier_score_total
      expect(actual).toBe(expected)
    })
})

// calculation functions

test('calcTrueFalseBrier produces correct result', () => {
  const expected = 0.009999999999999995
  const choice = 'True'
  const correctAnswer = 'True'
  const confidence = 90
  const actual = db.calcTrueFalseBrier(choice, correctAnswer, confidence)
  expect(actual).toBe(expected)
})

test('calcLimitBrier produces correct result', () => {
  const expected = 0.009999999999999995
  const upper = 100
  const lower = 10
  const value = 90
  const actual = db.calcLimitBrier(upper, lower, value)
  expect(actual).toBe(expected)
})
