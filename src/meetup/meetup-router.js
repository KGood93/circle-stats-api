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
    .post(jsonParser, (req, res, next) => {
        const {meetup_id, meetup_name} = req.body
        const newMeetup = {meetup_id, meetup_name}

        for(const [key, value] of Object.entries(newMeetup)) {
            if (value == null)
                return res.status(400).json({
                    error: {message: `Missing '${key}' in request body`}
                })
        }

        meetupService.insertMeetup(req.app.get('db'), newMeetup)
            .then(meetup => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${meetup.meetup_id}`))
                    .json(serializeMeetup(meetup))
            })
            .catch(next)
    })

module.exports = meetupRouter
