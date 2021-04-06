'use strict'
const rootSchema = require('./root.json')

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: rootSchema,
    handler: async (request, reply) => {
      reply.send({status: 'ok', timestamp: new Date().toISOString()})
    }
  })
}
