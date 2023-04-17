import { MyBaseEntity } from "src/commons/base.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Follow extends MyBaseEntity {


  // @Column()
  // userId: string;


  // @Column()
  // userfollowId: string;

  @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'userId'})
  userId: string;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'userFollowId'})
  userfollowId: string;
}