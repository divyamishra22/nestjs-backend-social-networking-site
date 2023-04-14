import { MyBaseEntity } from "src/commons/base.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class User extends MyBaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

//   @Column({ nullable: true })
//   bio: string;

}

