import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Book extends BaseEntity {
	@ObjectIdColumn()
	id: string

	@Column()
	title: string

	@Column()
	author: string

	@Column({ type: 'timestamp' })
	releaseDate: Date
}
