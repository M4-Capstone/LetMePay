import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  neighbourhood: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 60 })
  street: string;

  @Column({ length: 6, nullable: true })
  number: string;

  @Column({ length: 60 })
  city: string;

  @Column({ length: 2 })
  state: string;
}
