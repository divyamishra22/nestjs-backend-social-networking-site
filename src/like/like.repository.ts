import { Repository } from "typeorm";
import { Likes } from "./like.entity";

export class LikeRepository extends Repository<Likes> {}