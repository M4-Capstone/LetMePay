import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class TransactionCategories {
<<<<<<< HEAD
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;
=======
	@PrimaryGeneratedColumn('increment', { type: 'integer' })
	id: number
>>>>>>> develop

	@Column({ length: 2 })
	type: string
}
