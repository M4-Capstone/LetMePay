import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class TransactionCategories {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ length: 2 })
  type: string;
}
