import { MyBaseEntity } from "src/commons/base.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Follow extends MyBaseEntity {
// @Column()
//   userToId: string;


@ManyToOne(() => User,  { onDelete: 'CASCADE' })
  @JoinColumn({name: "userId"})
  user: User;


  // @Column()
  // user: string;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'userFollowId'})
  userfollowerId: User[];

  @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'userFollwoingId'})
  userfollowingId: User[];
}