import { Repository } from "typeorm";
import { Comment } from "./comments.entity";

export class CommentRepository extends Repository<Comment> {}