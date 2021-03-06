const express = require('express')

const groupBenefitDb = require('../db/groupBenefitDb')
const individualCostDb = require('../db/individualCostDb')
const elementsCostDb = require('../db/elementsCostDb')

const router = express.Router()

router.get('/analysis-one', (req, res) => {
  const groupId = Number(req.query.group)
  const userId = Number(req.query.user)
  let gbd = null
  groupBenefitDb.getGroupBenefitData(groupId)
    .then(data => {
      gbd = data
      return individualCostDb.getOwnCostData(userId)
    })
    .then(data => {
      res.json({
        gbd,
        icd: data
      })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/analysis-one-2', (req, res) => {
  const groupId = Number(req.query.group)
  const userId = Number(req.query.user)
  let icd = null
  individualCostDb.getOwnCostData(userId)
    .then(data => {
      icd = data
      return individualCostDb.getGroupCostData(groupId)
    }
    )
    .then(data => {
      res.json({
        icd,
        gcd: data
      })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/analysis-two/:id', (req, res) => {
  const userId = Number(req.params.id)
  let userElementCost = []
  elementsCostDb.getCostData(userId)
    .then(data => {
      userElementCost = data
      return elementsCostDb.getAllElementsData()
    })
    .then(data => {
      res.json({
        userElementCost,
        allUsersData: data
      })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/benefit', (req, res) => {
  groupBenefitDb.addGroupBenefit(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/benefit/:id', (req, res) => {
  const groupId = Number(req.params.id)
  groupBenefitDb.getGroupBenefitData(groupId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/cost', (req, res) => {
  individualCostDb.addIndividualCost(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.get('/cost/single-user/:id', (req, res) => {
  const userId = Number(req.params.id)
  individualCostDb.getOwnCostData(userId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/cost/group/:id', (req, res) => {
  const groupId = Number(req.params.id)
  individualCostDb.getGroupCostData(groupId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/elements/:id', (req, res) => {
  const userId = Number(req.params.id)
  elementsCostDb.addElements({data: req.body, user_id: userId})
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(500).send(err.message)
    })
})

module.exports = router
