import { Repository } from "typeorm";
import { Post } from "./posts.entity";

export class PostsRepository extends Repository<Post> {}