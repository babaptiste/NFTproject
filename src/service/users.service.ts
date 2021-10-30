import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "src/entity/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User
      ) {}

    async register(createUserDto): Promise<User> {
        return await this.usersRepository.create(
            {
                address: createUserDto.address,
                name: createUserDto.name,
                email: createUserDto.email,
                password: Math.random().toString(36).slice(2)
            });
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll<User>();
    }

    async findOne(email: string): Promise<User | undefined> {
        return (await this.usersRepository.findAll<User>()).find(user => user.email === email);
      }

    async addMember(UpdateUserDto) : Promise<User> {
        await this.usersRepository.update({ teamId: UpdateUserDto.teamId },
            {
                where: {
                    email: UpdateUserDto.email
                }
            });
        return this.usersRepository.findOne({
            where: {
                email: UpdateUserDto.email
            }
        });
    }
}