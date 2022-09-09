import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import Transaction from "./transactions.entity";

@Entity()
export default class Wallets {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transactions) => transactions.receiverWallet)
  receiverTransactions: Transaction[];

  @OneToMany(() => Transaction, (transactions) => transactions.senderWallet)
  senderTransactions: Transaction[];
}
