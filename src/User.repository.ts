import { User } from './User.entity'

class UserRepository {
	async get(id: string): Promise<User> {
		return await User.findOneOrFail({ where: { id } })
	}

	async getAll(): Promise<Array<User>> {
		return await User.find()
	}

	async update(id: string, dataToSave: Partial<User>): Promise<void> {
		await User.update({ id }, dataToSave)
	}

	async create(dataToSave: Omit<User, 'id'>): Promise<void> {
		await User.create(dataToSave).save()
	}

	async remove(id: string): Promise<void> {
		await User.delete({ id })
	}
}

export const userRepository = new UserRepository()
