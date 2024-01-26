import { Entity, type ObjectId, ObjectIdColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectId

	@Column()
	firstName: string

	@Column()
	lastName: string
}
