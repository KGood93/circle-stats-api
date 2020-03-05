const path = require('path')
const express = require('express')
const xss = require('xss')
const statsService = require('./stats-service')

const jsonParser = express.json()
const statsRouter = express.Router()

const serializeStat = stat => ({
    date: stat.date,
    meet_id: stat.meet_id,
    location: xss(stat.location),
    at_count: stat.at_count
});

statsRouter
    .route('/')
    .get((req, res, next) => {
        statsService.getAllStats(req.app.get('db'))
            .then(stat => {
                res.json(stat)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {meet_id, location, at_count} = req.body
        const newStat = {meet_id, location, at_count}

        for(const [key, value] of Object.entries(newStat))
            if(value == null)
                return res.status(400).json({
                    error: {message: `Missing '${key}' in request body`}
                })

        statsService.insertStat(req.app.get('db'), newStat)
            .then(stat => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl), `/stats`)
                    .json(serializeStat(stat))
            })
            .catch(next)
    })

module.exports = statsRouter