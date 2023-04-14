import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";


export class UsersRepository extends Repository<UserEntity> {}