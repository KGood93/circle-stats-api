const statsService = {
    getAllStats(knex) {
        return knex
            .select('*')
            .from('circle_stats')
    },
    insertStat(knex, newStat) {
        return knex
            .insert(newStat)
            .into('circle_stats')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, meetid) {
        return knex
            .from('circle_stats')
            .select('*')
            .where('meet_id', meetid)
            .first()
    }
}

module.exports = statsService