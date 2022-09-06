import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import TransactionCategories from "./transactionCategories.entity";
import Wallets from "./wallets.entity";

@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("decimal", { precision: 12, scale: 2 })
  amount: number;

  @Column("date")
  date: string;

  @Column("time")
  hour: string;

  @OneToOne(() => TransactionCategories, { eager: true })
  @JoinColumn()
  categoryType: TransactionCategories;

  @OneToOne(() => Wallets)
  @JoinColumn()
  receiverWallet: Wallets;

  @OneToOne(() => Wallets, { nullable: true })
  @JoinColumn()
  senderWallet: Wallets;
}
