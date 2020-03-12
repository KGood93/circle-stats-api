const statsService = require('../src/stats/stats-service')
const knex = require('knex')

describe(`Stats Service Object`, function() {
    let db 
    let testStats = [
        {
            date: new Date('2029-01-22T16:28:32.615Z'), 
            meet_id: 1,
            location: 'Rainbows End Alpacas',
            attendance: 15,
            notes: 'Ice Storm',
        },
        {
            date: new Date('2029-01-22T16:28:32.615Z'), 
            meet_id: 2,
            location: 'The Loop',
            attendance: 30,
            notes: 'None',
        },
        {
            date: new Date('2029-01-22T16:28:32.615Z'), 
            meet_id: 1,
            location: 'Cream City Yarns',
            attendance: 42,
            notes: 'Lots of Parking',
        },
        {
            date: new Date('2029-01-22T16:28:32.615Z'), 
            meet_id: 2,
            location: 'The Waxwing',
            attendance: 25,
            notes: '2 hour parking, tacofest',
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
    })

    before(() => db('circle_stats').truncate())

    afterEach(() => db('circle_stats').truncate())

    after(() => db.destroy())

    context(`Given 'circle_stats' has data`, () => {
        beforeEach(() => {
            return db
                .into('circle_stats')
                .insert(testStats)
        })

        it(`getAllStats() resolves all stats from 'circle_stats' table`, () => {
            return statsService.getAllStats(db)
                .then(actual => {
                    expect(actual).to.eql(testStats)
                })
        })
    })

    context(`Given 'circle_stats' has no data`, () => {
        it(`getAllStats() resolves and empty array`, () => {
            return statsService.getAllStats(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertStat() inserts a new stat and resolves the new entry`, () => {
            const newStat = {
                date: new Date('2029-01-22T16:28:32.615Z'), 
                meet_id: 1,
                location: 'Starstruck Cat Yarn Studio',
                attendance: 24,
                notes: 'None',
            }
            return statsService.insertStat(db, newStat)
                .then(actual => {
                    expect(actual).to.eql({
                        date: newStat.date,
                        meet_id: newStat.meet_id,
                        location: newStat.location,
                        attendance: newStat.attendance, 
                        notes: newStat.notes
                    })
                })
        })
    })
})