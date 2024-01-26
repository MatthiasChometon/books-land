import { Entity, type ObjectId, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export class Book {
	@ObjectIdColumn()
	id: ObjectId

	@Column()
	title: string

	@Column()
	author: string

	@Column({ type: 'timestamp' })
	releaseDate: Date
}
