const meetupService = {
    getAllMeetups(knex) {
        return knex
            .select('*')
            .from('circle_meetups')
    },
    insertMeetup(knex, newMeet) {
        return knex
            .insert(newMeet)
            .into('circle_meetups')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }, 
    deleteMeetup(knex, meetup_id) {
        return knex('circle_meetups')
            .where({meetup_id})
            .delete()
    }
}

module.exports = meetupService