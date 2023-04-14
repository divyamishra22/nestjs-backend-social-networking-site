import { MyBaseEntity } from "src/commons/base.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Photo extends MyBaseEntity {
  

  @Column()
  body: string;

  @Column()
  key: string;

  @ManyToOne(() => User,  { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;


  
}