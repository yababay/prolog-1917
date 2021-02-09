const fs = require('fs')
const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis)

let isConfigured = !!process.env.REDIS_HOST

if(!isConfigured && fs.existsSync('.env')){
    const dotenv = require('dotenv').config()
    isConfigured = true
}

const creds = isConfigured && {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
} || {}

module.exports = redis.createClient(creds)

