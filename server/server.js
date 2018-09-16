const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/users.js')
const brier = require('./routes/brier.js')
const estimation = require('./routes/estimation.js')

const server = express()

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

// Routes
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/brier', brier)
server.use('/api/v1/estimation', estimation)

server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

server.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  next()
})

module.exports = server
