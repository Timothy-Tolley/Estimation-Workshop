const express = require('express')

const db = require('../db/brierDb')

const router = express.Router()

router.post('/trivia-one', (req, res) => {
  db.addBrierOne(req.body)
    .then(resp => res.json(resp))
    // .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.post('/trivia-two', (req, res) => {
  db.addBrierTwo(req.body)
    .then(resp => res.json(resp))
    // .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.get('trivia-one/:id', (req, res) => {
  const userId = Number(req.params.id)
  db.getBrierOne(userId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/:id', (req, res) => {
  const userId = Number(req.params.id)
  db.getBothBriers(userId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
