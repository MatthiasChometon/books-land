import { Book } from './Book.entity'

class BookRepository {
	async get(id: string): Promise<Book> {
		return await Book.findOneOrFail({ where: { id } })
	}

	async getAll(): Promise<Array<Book>> {
		return await Book.find()
	}

	async update(id: string, dataToSave: Partial<Book>): Promise<void> {
		await Book.update({ id }, dataToSave)
	}

	async create(dataToSave: Omit<Book, 'id'>): Promise<void> {
		await Book.create(dataToSave).save()
	}

	async remove(id: string): Promise<void> {
		await Book.delete({ id })
	}
}

export const bookRepository = new BookRepository()
