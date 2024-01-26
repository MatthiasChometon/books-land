import Fastify from 'fastify'

const fastify = Fastify({
	logger: true
})

fastify.get('/', async (request, reply) => {
	await reply.type('application/json').code(200)
	return { hello: 'world' }
})

fastify.listen({ port: 3000 }, (err, address) => {
	if (err !== null) throw err
})
