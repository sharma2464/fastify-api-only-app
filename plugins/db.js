'use strict'

const fp = require('fastify-plugin')
const pgPromise = require('pg-promise')()
require('dotenv').config()
// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
const appConfig = require('../config/appConfig')

module.exports = fp(async function (fastify, opts) {
    const db = await pgPromise(appConfig.postgresUri)
    fastify.decorate('db', db)
})
