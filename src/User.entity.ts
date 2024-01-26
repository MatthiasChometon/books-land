import { Entity, type ObjectId, ObjectIdColumn, Column, BaseEntity } from 'typeorm'
import { type Book } from './Book.entity'

@Entity()
export class User extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectId

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column()
	readBooks: Array<Book>
}
