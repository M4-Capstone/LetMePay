import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import Addresses from "./addresses.entity";
import Wallets from "./wallets.entity";
import Transaction from "./transactions.entity";

@Entity()
export default class Users {
  @PrimaryColumn("varchar", { length: 14 })
  documentId: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 70, unique: true })
  email: string;

  @Column({ length: 160 })
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses)
  @JoinColumn()
  address: Addresses;

  @OneToOne(() => Wallets, { eager: true })
  @JoinColumn()
  wallet: Wallets;

  @OneToMany(() => Transaction, (transactions) => transactions.receiverId)
  receiverTransactions: Transaction[];

  @OneToMany(() => Transaction, (transactions) => transactions.senderId)
  senderTransactions: Transaction[];
}
