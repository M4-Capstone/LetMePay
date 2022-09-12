import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Transaction from "./transactions.entity";

@Entity()
export default class TransactionCategories {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ length: 2 })
  type: string;

  @OneToMany(() => Transaction, (transactions) => transactions.categoryType)
  Transactions: Transaction[];
}
