import Fastify from 'fastify'
import { DataSource } from 'typeorm'
import { User } from './User.entity'
import { Book } from './Book.entity'
import { UserRoute } from './User.route'
import 'dotenv/config'
export const fastify = Fastify({
	logger: true
})

const { DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = process.env

const dataSource: DataSource = new DataSource({
	type: 'mongodb',
	url: `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}?authSource=admin`,
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
