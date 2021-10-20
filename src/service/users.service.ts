import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    register(createUserDto): string {
        return 'oui';
    }
}