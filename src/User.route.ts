import { type FastifyReply, type FastifyRequest } from 'fastify'
import { type User } from './User.entity'
import { userRepository } from './User.repository'
import { fastify } from '.'

export class UserRoute {
	async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
		const {
			params: { id }
		} = request
		const user = await userRepository.get(id)
		await reply.send(user)
	}

	async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
		const users: Array<User> = await userRepository.getAll()
		await reply.send({ users })
	}

	async update(
		request: FastifyRequest<{ Params: { id: string }; Body: { dataToSave: Partial<User> } }>,
		reply: FastifyReply
	): Promise<void> {
		const {
			params: { id },
			body: { dataToSave }
		} = request
		await userRepository.update(id, dataToSave)
		await reply.send({ user: 'updated' })
	}

	async create(
		request: FastifyRequest<{ Body: { userToSave: Omit<User, 'id'> } }>,
		reply: FastifyReply
	): Promise<void> {
		const {
			body: { userToSave }
		} = request
		const user = await userRepository.create(userToSave)
		await reply.send({ user })
	}

	async remove(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
		const {
			params: { id }
		} = request
		await userRepository.remove(id)
		await reply.send({ user: 'deleted' })
	}

	build(): void {
		const userRoute = new UserRoute()

		fastify.get('/user/:id', userRoute.get)
		fastify.get('/user', userRoute.getAll)
		fastify.post('/user', userRoute.create)
		fastify.patch('/user/:id', userRoute.update)
	}
}
