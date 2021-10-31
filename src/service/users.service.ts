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

    async addRole(UpdateRoleDto): Promise<User> {
        await this.usersRepository.update({ roles: UpdateRoleDto.roles },
            {
                where: {
                    email: UpdateRoleDto.email
                }
            });
        return this.usersRepository.findOne({
            where: {
                email: UpdateRoleDto.email
            }
        });
    }
}