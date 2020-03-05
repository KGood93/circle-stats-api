const path = require("path")
const express = require("express")
const xss = require("xss")
const meetupService = require("./meetup-service")

const meetupRouter = express.Router()
const jsonParser = express.json()

const serializeMeetup = meetup => ({
    meetup_id: meetup.meetup_id,
    meetup_name: xss(meetup.meetup_name),
})

meetupRouter
    .route('/')
    .get((req, res, next) => {
        meetupService.getAllMeetups(req.app.get('db'))
        .then(meetup => {
            res.json(meetup.map(serializeMeetup))
        })
        .catch(next)
    })

module.exports = meetupRouter
