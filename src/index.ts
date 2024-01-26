import Fastify from 'fastify'
import { DataSource } from 'typeorm'
const fastify = Fastify({
	logger: true
})

const dataSource: DataSource = new DataSource({
	type: 'mongodb',
	database: 'test',
	synchronize: true,
	logging: false,
	entities: [],
	migrations: [],
	subscribers: []
})
dataSource.initialize().catch((error) => {
	console.log(error)
})

fastify.get('/', async (_request, reply) => {
	await reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 }, function (error, address) {
	if (error !== null) {
		fastify.log.error(error)
		process.exit(1)
	}
})
