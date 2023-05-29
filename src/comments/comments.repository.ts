import { Repository } from "typeorm";
import {  Comments } from "./comments.entity";

export class CommentRepository extends Repository<Comments> {}