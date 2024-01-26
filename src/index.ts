import Fastify from 'fastify'
import { DataSource } from 'typeorm'
import { User } from './User.entity'
import { Book } from './Book.entity'
import { UserRoute } from './User.route'
import { BookRoute } from './Book.route'
export const fastify = Fastify({
	logger: true
})

const dataSource: DataSource = new DataSource({
	type: 'mongodb',
	host: 'localhost',
	port: 27017,
	database: 'books-land',
	synchronize: true,
	logging: false,
	entities: [User, Book],
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

const bookRoute = new BookRoute()
bookRoute.build()

fastify.listen({ port: 3000 }, (error) => {
	if (error !== null) {
		fastify.log.error(error)
		process.exit(1)
	}
})
