import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Matches } from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    teamId: number;
}