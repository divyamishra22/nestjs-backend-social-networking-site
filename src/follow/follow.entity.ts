import { MyBaseEntity } from "src/commons/base.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Follow extends MyBaseEntity {


  // @Column()
  // userId: string;


  // @Column()
  // userfollowId: string;

  @ManyToOne(() => User, )
  @JoinColumn({name: 'userToId'})
  userToId: string;

  @ManyToOne(() => User, )
  @JoinColumn({name: 'userFromId'})
  userFromId: string;
}