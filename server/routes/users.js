const express = require('express')

const db = require('../db/userDb')

const router = express.Router()

router.post('/', (req, res) => {
  db.addUser(req.body)
    .then(resp => res.json({resp}))
    // .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.post('/email/:id', (req, res) => {
  const id = Number(req.params.id)
  db.updateEmailPrefs(id, req.body)
    .then(email =>
      res.sendStatus(200)
    )
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/email/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getEmail(id)
    .then(emails => {
      res.json(emails)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/group/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getGroup(id)
    .then(groupId => {
      res.json(groupId)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
