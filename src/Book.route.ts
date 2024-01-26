import { type FastifyReply, type FastifyRequest } from 'fastify'
import { fastify } from '.'
import { bookRepository } from './Book.repository'
import { type Book } from './Book.entity'

export class BookRoute {
	async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
		const {
			params: { id }
		} = request
		const book = await bookRepository.get(id)
		await reply.send(book)
	}

	async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
		const books: Array<Book> = await bookRepository.getAll()
		await reply.send({ books })
	}

	async update(
		request: FastifyRequest<{ Params: { id: string }; Body: { dataToSave: Partial<Book> } }>,
		reply: FastifyReply
	): Promise<void> {
		const {
			params: { id },
			body: { dataToSave }
		} = request
		await bookRepository.update(id, dataToSave)
		await reply.send({ book: 'updated' })
	}

	async create(request: FastifyRequest<{ Body: { dataToSave: Book } }>, reply: FastifyReply): Promise<void> {
		const {
			body: { dataToSave }
		} = request
		await bookRepository.create(dataToSave)
		await reply.send({ book: 'created' })
	}

	async remove(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
		const {
			params: { id }
		} = request
		await bookRepository.remove(id)
		await reply.send({ book: 'deleted' })
	}

	build(): void {
		const bookRoute = new BookRoute()

		fastify.get('/book/:id', bookRoute.get)
		fastify.get('/book', bookRoute.getAll)
		fastify.post('/book', bookRoute.create)
		fastify.patch('/book/:id', bookRoute.update)
	}
}
