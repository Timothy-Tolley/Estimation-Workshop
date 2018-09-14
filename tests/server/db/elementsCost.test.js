/* global test expect beforeEach afterEach */
const testEnv = require('./test-environment')

const db = require('../../../server/db/elementsCostDb')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

// getCostData gets all data from elements estimate

test('getCostData gets all data from elements estimate', () => {
  const expected = 13
  const id = 4
  return db.getCostData(id, testDb)
    .then(data => {
      const actual = data[0].pessimistic_one
      expect(actual).toBe(expected)
    })
})

// add Elements Estimate data

test('addElements adds new users element estimates', () => {
  const expectedLikeTwo = 55
  const expectedPessOne = 22
  const input = {
    user_id: 13,
    data: {
      pessimistic_one: 22,
      optimistic_one: 20,
      likely_one: 30,
      pessimistic_two: 40,
      optimistic_two: 50,
      likely_two: 55,
      pessimistic_three: 60,
      optimistic_three: 70,
      likely_three: 80,
      pessimistic_four: 90,
      optimistic_four: 100,
      likely_four: 110,
      pessimistic_five: 120,
      optimistic_five: 130,
      likely_five: 140
    }
  }
  const id = 13
  return db.addElements(input, testDb)
    .then(users => {
      return db.getCostData(id, testDb)
    })
    .then(data => {
      const actualLikeTwo = data[0].likely_two
      const actualPessOne = data[0].pessimistic_one
      expect(actualLikeTwo).toBe(expectedLikeTwo)
      expect(actualPessOne).toBe(expectedPessOne)
    })
    .catch(err => expect(err).toBeNull())
})
