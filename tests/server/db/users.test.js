/* global test expect beforeEach afterEach */
const testEnv = require('./test-environment')

const db = require('../../../server/db/userDb')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

// Get all users

test('getUsers gets all users', () => {
  const expected = 12
  return db.getUsers(testDb)
    .then(users => {
      const actual = users.length
      expect(actual).toBe(expected)
    })
    .catch(err => expect(err).toBeNull())
})

// Get group id by id

test('getGroup gets a group id by user id', () => {
  const expected = 1
  return db.getGroup(1, testDb)
    .then(user => {
      const actual = user[0].group_id
      expect(actual).toBe(expected)
    })
    .catch(err => expect(err).toBeNull())
})

// Get email by user id

test('getEmail gets a emails by user id', () => {
  const expectedEmail = 'test@test2.com'
  const expectedWorkEmail = 'test@worktest2.com'
  return db.getEmail(2, testDb)
    .then(user => {
      const actualEmail = user[0].email
      const actualWorkEmail = user[0].work_email
      expect(actualEmail).toBe(expectedEmail)
      expect(actualWorkEmail).toBe(expectedWorkEmail)
    })
    .catch(err => expect(err).toBeNull())
})

// Add user adds a new user

test('addUsers adds new user', () => {
  const expected = 13
  const input = {
    name: 'testAdd',
    email: 'add@test.com',
    work_email: 'add@work.com',
    group_id: '5'
  }
  return db.addUser(input, testDb)
    .then(users => {
      return db.getUsers(testDb)
    })
    .then(users => {
      const actual = users.length
      expect(actual).toBe(expected)
    })
    .catch(err => expect(err).toBeNull())
})

// UpdateEmailPrefs updates the email preferences

test('UpdateEmailPrefs updates the email preferences - current is correct, not work email, dont add new', () => {
  const id = 3
  const expectedEmail = 'test@test3.com'
  const expectedWorkEmail = 'test@worktest3.com'
  const input = {
    updateEmail: 'test@current.com',
    correctCheck: 'Yes',
    workEmailCheck: 'No',
    addEmailCheck: 'No',
    addWorkEmail: 'add@work.com'
  }
  return db.updateEmailPrefs(id, input, testDb)
    .then(() => {
      return db.getEmail(id, testDb)
    })
    .then(user => {
      const actualEmail = user[0].email
      const actualWorkEmail = user[0].work_email
      expect(actualEmail).toBe(expectedEmail)
      expect(actualWorkEmail).toBe(expectedWorkEmail)
    })
    .catch(err => expect(err).toBeNull())
})

test('UpdateEmailPrefs updates the email preferences - current is incorrect, not work email, dont add new', () => {
  const id = 3
  const expectedEmail = 'test@current.com'
  const expectedWorkEmail = 'test@worktest3.com'
  const input = {
    updateEmail: 'test@current.com',
    correctCheck: 'No',
    workEmailCheck: 'No',
    addEmailCheck: 'No',
    addWorkEmail: 'add@work.com'
  }
  return db.updateEmailPrefs(id, input, testDb)
    .then(() => {
      return db.getEmail(id, testDb)
    })
    .then(user => {
      const actualEmail = user[0].email
      const actualWorkEmail = user[0].work_email
      expect(actualEmail).toBe(expectedEmail)
      expect(actualWorkEmail).toBe(expectedWorkEmail)
    })
    .catch(err => expect(err).toBeNull())
})

test('UpdateEmailPrefs updates the email preferences - current is incorrect, not work email, add new', () => {
  const id = 3
  const expectedEmail = 'test@current.com'
  const expectedWorkEmail = 'add@work.com'
  const input = {
    updateEmail: 'test@current.com',
    correctCheck: 'No',
    workEmailCheck: 'No',
    addEmailCheck: 'Yes',
    addWorkEmail: 'add@work.com'
  }
  return db.updateEmailPrefs(id, input, testDb)
    .then(() => {
      return db.getEmail(id, testDb)
    })
    .then(user => {
      const actualEmail = user[0].email
      const actualWorkEmail = user[0].work_email
      expect(actualEmail).toBe(expectedEmail)
      expect(actualWorkEmail).toBe(expectedWorkEmail)
    })
    .catch(err => expect(err).toBeNull())
})
