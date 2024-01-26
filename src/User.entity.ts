import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm'
import { Book } from './Book.entity'

@Entity()
export class User extends BaseEntity {
	@ObjectIdColumn()
	id: string

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column(() => Book)
	readBooks: Array<Book>
}
