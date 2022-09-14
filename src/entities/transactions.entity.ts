import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import TransactionCategories from "./transactionCategories.entity";
import Users from "./users.entity";
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

  @ManyToOne(() => TransactionCategories, { eager: true, nullable: false })
  categoryType: TransactionCategories;

  @ManyToOne(() => Wallets, { nullable: false })
  receiverWallet: Wallets;

  @ManyToOne(() => Wallets, { nullable: true })
  senderWallet: Wallets;

  @ManyToOne(() => Users,(user)=>user.receiverTransactions)
  receiverId: Users;

  @ManyToOne(() => Users, (user) => user.senderTransactions, { nullable: true })
  senderId: Users;
}
