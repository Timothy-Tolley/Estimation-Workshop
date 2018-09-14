/* global test expect beforeEach afterEach */
const testEnv = require('./test-environment')

const db = require('../../../server/db/GroupBenefitDb')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

// Get group cost data

test('getGroupBenefitData gets group benefit data', () => {
  const expectedPess = 80
  const expectedOpt = 40
  const expectedLike = 45
  const id = 4
  return db.getGroupBenefitData(id, testDb)
    .then(data => {
      const actualPess = data[0].pessimistic
      const actualOpt = data[0].optimistic
      const actualLike = data[0].likely
      expect(actualPess).toBe(expectedPess)
      expect(actualOpt).toBe(expectedOpt)
      expect(actualLike).toBe(expectedLike)
    })
    .catch(err => expect(err).toBeNull())
})

// addGroupBenefit adds a group's benefit data, Checks new data is added

test('addGroupBenefit adds new users cost data', () => {
  const expectedLike = 800
  const input = {
    group_id: '13',
    data: {
      pessimistic: 1000,
      optimistic: 1000,
      likely: 1000,
      chance_of_success: 80
    }
  }
  const id = 13
  return db.addGroupBenefit(input, testDb)
    .then(users => {
      return db.getGroupBenefitData(id, testDb)
    })
    .then(data => {
      const actualLike = data[0].likely
      expect(actualLike).toBe(expectedLike)
    })
    .catch(err => expect(err).toBeNull())
})
