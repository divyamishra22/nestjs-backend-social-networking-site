import { MyBaseEntity } from "src/commons/base.entity";
import { Posts } from "src/posts/posts.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Likes extends MyBaseEntity {
  

 @Column()
 userId: string; 

  @Column()
  postId: string;

  @ManyToOne(() => Posts)
  @JoinColumn({name: "postId"})
  posts: Posts;

  @ManyToOne(() => User)
  @JoinColumn({name: "userId"})
  user: User;

}
