import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import Addresses from "./addresses.entity";
import Wallets from "./wallets.entity";

@Entity()
export default class Users {
  @PrimaryColumn("varchar", { length: 14 })
  documentId: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 70, unique: true })
  email: string;

  @Column({ length: 160 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses, { eager: true })
  @JoinColumn()
  address: Addresses;

  @OneToOne(() => Wallets, { eager: true })
  @JoinColumn()
  wallet: Wallets;
}
