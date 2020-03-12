const meetupService = require('../src/meetup/meetup-service.js')
const knex = require('knex')

describe(`Meetup service object`, function() {
    let db 
    let testMeetups = [
        {
            meetup_id: 1,
            meetup_name: 'Eastside meetup',
            meetup_note: '1st weekend of the month',
        },
        {
            meetup_id: 2,
            meetup_name: 'Westside meetup',
            meetup_note: '3rd weekend of the month',
        },
        {
            meetup_id: 3,
            meetup_name: 'Northside meetup',
            meetup_note: '2nd weekend of the month',
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
    })

    before(() => db('circle_meetups').truncate())

    afterEach(() => db('circle_meetups').truncate())

    after(() => db.destroy())

    context(`Given 'circle_meetups' has data`, () => {
        before(() => {
            return db
                .into('circle_meetups')
                .insert(testMeetups)
        })

        it(`getAllMeetups() resolves all meetups from 'circle_meetups' table`, () => {
            return meetupService.getAllMeetups(db)
                .then(actual => {
                    expect(actual).to.eql(testMeetups)
                })
        })
    })

    context(`Given 'circle_meetups' has no data`, () => {
        it(`getAllMeetups() resolves an empty array`, () => {
            return meetupService.getAllMeetups(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertMeetup() inserts a new meetup and resolves the new meetup with an 'id'`, () => {
            const newMeetup = {
                meetup_name: 'Southside meetup',
                meetup_note: '2nd weekend of the month',
            }
            return meetupService.insertMeetup(db, newMeetup)
                .then(actual => {
                    expect(actual).to.eql({
                        meetup_id: 1, 
                        meetup_name: newMeetup.meetup_name,
                        meetup_note: newMeetup.meetup_note
                    })
                })
        })
    })

})