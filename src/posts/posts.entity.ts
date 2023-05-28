import { Comment } from "src/comments/comments.entity";
import { MyBaseEntity } from "src/commons/base.entity";
import { Likes } from "src/like/like.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Posts extends MyBaseEntity {
  

  @Column({default:true})
  post: string;

  @Column({default:true})
  image: string;

  

  @ManyToOne(() => User, (user)=>user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' , })
  user: User;
  
  @Column()
  userId:string;

  @OneToMany((type) => Likes, (like) => like.posts, { onDelete: 'CASCADE' })
  //  {
  //   lazy: true,
  //   cascade: true,
  // })
   likes: Likes[];
  
   @OneToMany((type) => Comment, (comments) => comments.posts, { onDelete: 'CASCADE' })
   comments: Comment[];
  
}