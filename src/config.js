module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    //CLIENT_ORIGIN: 'https://circle-stats-app.goodreaukath.now.sh',
    CLIENT_ORIGIN: 'https://circle-stats-app.vercel.app/',
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
}