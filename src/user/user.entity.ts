import { MyBaseEntity } from "src/commons/base.entity";
import { Follow } from "src/follow/follow.entity";
import { Likes } from "src/like/like.entity";
import { Posts } from "src/posts/posts.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



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

  @Column({ nullable: true })
  bio: string;

   @OneToMany((type) => Posts, (post) => post.user, 
   {
    lazy: true,
    cascade: true,
  })
   posts: Posts[];

   @OneToMany((type) => Likes, (like) => like.userId, 
   {
    lazy: true,
    cascade: true,
  })
   likes: Likes[];

   @OneToMany((type) => Follow, (follow) => follow.userfollowerId, 
   {
    lazy: true,
    cascade: true,
  })
   followers  : Follow[];

   @OneToMany((type) => Follow, (follow) => follow.userfollowingId, 
   {
    lazy: true,
    cascade: true,
  })
   following  : Follow[];


}

