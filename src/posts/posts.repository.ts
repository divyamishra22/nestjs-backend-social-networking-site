import { Repository } from "typeorm";
import {  Posts } from "./posts.entity";

export class PostRepository extends Repository<Posts> {}