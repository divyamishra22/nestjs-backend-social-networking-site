import { MyBaseEntity } from "src/commons/base.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Follow extends MyBaseEntity {


  @Column()
  userToId: string;


  @Column()
  userFromId: string;

  @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' }  )
  @JoinColumn({name: 'userToId'})
  userTo: User[];

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' }  )
  @JoinColumn({name: 'userFromId'})
  userFrom: User[];
}