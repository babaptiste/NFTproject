import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Matches } from "class-validator";

export class UpdateNftDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    id: string;
    
    @IsNotEmpty()
    @ApiProperty()
    owner: string;
}