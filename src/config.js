module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: 'https://circle-stats-app.goodreaukath.now.sh/',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://Katy:test@localhost/circle-stats',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://Katy:test@localhost/circle-stats-test',
}