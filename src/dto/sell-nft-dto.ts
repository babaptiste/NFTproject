import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Matches } from "class-validator";

export class SellNftDto {
    @IsNotEmpty()
    @ApiProperty()
    id: string;
    
    @IsNotEmpty()
    @ApiProperty()
    owner: string;
}