import Fastify from 'fastify'
import { DataSource } from 'typeorm'
import { User } from './User.entity'
import { Book } from './Book.entity'
import { UserRoute } from './User.route'
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

const userRoute = new UserRoute()
userRoute.build()

fastify.listen({ port: 3000 }, (error) => {
	if (error !== null) {
		fastify.log.error(error)
		process.exit(1)
	}
})
