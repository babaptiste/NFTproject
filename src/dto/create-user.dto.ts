import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {
    @Matches(/^0x[a-fA-F0-9]{40}/)
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
}