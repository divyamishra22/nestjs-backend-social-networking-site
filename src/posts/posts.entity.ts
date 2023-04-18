import { MyBaseEntity } from "src/commons/base.entity";
import { Likes } from "src/like/like.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Posts extends MyBaseEntity {
  

  @Column()
  post: string;

//   @Column()
//   key: string;

  @ManyToOne(() => User,  { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' , })
  user: User;
  
  @Column()
  userId:string;

  // @OneToMany((type) => Likes, (like) => like.postId, 
  //  {
  //   lazy: true,
  //   cascade: true,
  // })
  //  likes: Likes[];
  
}