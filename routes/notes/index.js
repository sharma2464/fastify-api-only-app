'use strict'
const notesSchema = require('./notes.json')
const NotesDAL = require('./notesDAL');

module.exports = async function (fastify, opts) {
    const notesDAL = NotesDAL(fastify.db)

    // GET Route
    fastify.route({
        method: 'GET',
        url: '/',
        schema: notesSchema.GET,
        handler: async (request, reply) => {
            return await notesDAL.getAllNotes()
        }
    });

    // POST Route
    fastify.route({
        method: 'POST',
        url: '/',
        schema: notesSchema.POST,
        handler: async (request, reply) => {
            const {title, body} = request.body;
            return await notesDAL.createNote(title, body)
        }
    });

    // PUT Route
    fastify.route({
        method: 'PUT',
        url: '/:id',
        schema: notesSchema.PUT,
        handler: async (request, reply) => {
            const {title, body} = request.body;
            const {id} = request.params;
            return await notesDAL.updateNote(id, title, body)
        }
    });

    // DELETE Route
    fastify.route({
        method: 'DELETE',
        url: '/:id',
        schema: notesSchema.DELETE,
        handler: async (request, reply) => {
            const { id } = request.params;
            await notesDAL.deleteNote(id)
            reply.status(204)
        }
    })
}
