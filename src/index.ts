import Fastify from 'fastify'
import { DataSource } from 'typeorm'
import { UserRoute } from './User.route'
export const fastify = Fastify({
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

const userRoute = new UserRoute()
userRoute.build()

fastify.listen({ port: 3000 }, (error) => {
	if (error !== null) {
		fastify.log.error(error)
		process.exit(1)
	}
})
