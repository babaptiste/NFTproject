import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "src/entity/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User
      ) {}

    async register(createUserDto): Promise<User> {
        const { Op } = require("sequelize");
        const userInDb = await this.usersRepository.findOne({ 
            where: { 
   
                [Op.or]: [
                    {
                        name: 
                        {
                            [Op.eq]: createUserDto.name
                        }
                    }, 
                    {
                        email: 
                        {
                            [Op.eq]: createUserDto.email
                        }
                    }
                ]
            } 
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
        }
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

    async findOne(username: string): Promise<User | undefined> {
        return (await this.usersRepository.findAll<User>()).find(user => user.name === username);
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