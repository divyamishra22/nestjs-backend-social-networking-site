import { MyBaseEntity } from "src/commons/base.entity";
import { Posts } from "src/posts/posts.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity()
export class Comments extends MyBaseEntity {
 
  @Column()
  body: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' , })
  user: User;

  @ManyToOne(() => Posts, (posts) => posts.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' , })
  posts: Posts;

  @Column()
  postId: string;

}