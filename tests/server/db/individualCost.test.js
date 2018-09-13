/* global test expect beforeEach afterEach */
const testEnv = require('./test-environment')

const db = require('../../../server/db/individualCostDb')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

// Get own cost data

test('getOwnCostData gets personal cost data', () => {
  const expectedPess = 400
  const expectedOpt = 300
  const expectedLike = 350
  const id = 3
  return db.getOwnCostData(id, testDb)
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

test('getGroupCostData gets group cost data', () => {
  const expectedPess1 = 800
  const expectedOpt1 = 700
  const expectedLike1 = 750
  const expectedPess2 = 900
  const expectedOpt2 = 800
  const expectedLike2 = 850
  const groupId = 3
  return db.getGroupCostData(groupId, testDb)
    .then(data => {
      const actualPess1 = data[0].pessimistic
      const actualOpt1 = data[0].optimistic
      const actualLike1 = data[0].likely
      const actualPess2 = data[1].pessimistic
      const actualOpt2 = data[1].optimistic
      const actualLike2 = data[1].likely
      expect(actualPess1).toBe(expectedPess1)
      expect(actualOpt1).toBe(expectedOpt1)
      expect(actualLike1).toBe(expectedLike1)
      expect(actualPess2).toBe(expectedPess2)
      expect(actualOpt2).toBe(expectedOpt2)
      expect(actualLike2).toBe(expectedLike2)
    })
    .catch(err => expect(err).toBeNull())
})

// addIndividualCost adds a user's cost data, Checks new data is added

test('addUsers adds new users cost data', () => {
  const expectedLike = 1250
  const input = {
    user_id: '13',
    data: {
      pessimistic: '1300',
      optimistic: '1200',
      likely: '1250',
      group_id: '5'
    }
  }
  const id = 13
  return db.addIndividualCost(input, testDb)
    .then(users => {
      return db.getOwnCostData(id, testDb)
    })
    .then(data => {
      const actualLike = data[0].likely
      expect(actualLike).toBe(expectedLike)
    })
    .catch(err => expect(err).toBeNull())
})
