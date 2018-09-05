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

router.post('/update-gb/:id', (req, res) => {
  const id = Number(req.params.id)
  db.updateComplete({
    user_id: id,
    survey: 'completed_group_benefit'
  })
    .then(res => res.status(200))
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

// router.get('/mvvms', (req, res) => {
//   db.getElementSurveyOne('mvvm_name')
//     .then(mvvms => {
//       res.send(mvvms)
//     })
//     .catch(err => {
//       res.status(500).send('DATABASE ERROR: ' + err.message)
//     })
// })

module.exports = router
