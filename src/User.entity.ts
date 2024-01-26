import { Entity, type ObjectId, ObjectIdColumn, Column } from 'typeorm'
import { type Book } from './Book.entity'

@Entity()
export class User {
	@ObjectIdColumn()
	id: ObjectId

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column()
	readBooks: Array<Book>
}
