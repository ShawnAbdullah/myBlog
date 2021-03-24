export default {

    mysql: {
       connectionLimit: 10,
       user: process.env.DB_USER,
       password: process.env.DB_PASS,
       host: process.env.DB_HOST,
       database: process.env.DB_SCHEMA
    },
    auth: {
        secret: process.env.SECRET
    },
    stripe: {
        sk_key: process.env.STRIPE_SK
    },
    mailgun: {
        api_key: process.env.MAILGUN_API,
        domain: process.env.MAILGUN_DOMAIN
    }
}
