'use strict'

const db = require('APP/db')
const WeatherLog = db.model('weatherLogs')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    mustBeLoggedIn,
    (req, res, next) =>
      WeatherLog.findAll()
        .then(logs => {
          res.json(logs)
      })
        .catch(next))
  .post('/',
    (req, res, next) =>
      WeatherLog.create(req.body)
      .then(log => res.status(201).json(log))
      .catch(next))
  .delete('/:logId', (req,res,next)=>{
    WeatherLog.destroy({where: {id: req.params.logId}})
    .then(log=>
      res.send(req.params.logId)
    )
    .catch(next)
  })
  // .get('/:id',
  //   mustBeLoggedIn,
  //   (req, res, next) =>
  //     User.findById(req.params.id)
  //     .then(user => res.json(user))
  //     .catch(next))