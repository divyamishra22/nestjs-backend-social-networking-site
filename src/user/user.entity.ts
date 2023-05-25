import { MyBaseEntity } from "src/commons/base.entity";
import { Follow } from "src/follow/follow.entity";
import { Likes } from "src/like/like.entity";
import { Posts } from "src/posts/posts.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class User extends MyBaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

  @Column()
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({nullable:true})
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  bio: string;

   @OneToMany((type) => Posts, (posts) => posts.user, 
  //  {
  //   lazy: true,
  //   cascade: true,
  // }
  { onDelete: 'CASCADE' }
  )
   posts: Posts[];

   @OneToMany((type) => Likes, (like) => like.userId, 
   {
    lazy: true,
    cascade: true,
  })
   likes: Likes[];

   @OneToMany((type) => Follow, (follow) => follow.userFrom, { onDelete: 'CASCADE' } 
  //  {
  //   lazy: true,
  //   cascade: true,
  // }
  )
   followers  : Follow[];

   @OneToMany((type) => Follow, (follow) => follow.userTo, { onDelete: 'CASCADE' }
  //  {
  //   lazy: true,
  //   cascade: true,
  // }
  )
   following  : Follow[];


}

