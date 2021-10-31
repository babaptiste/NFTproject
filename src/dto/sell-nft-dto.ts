import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Matches } from "class-validator";

export class SellNftDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    id: number;
    
    @IsNotEmpty()
    @ApiProperty()
    owner: string;
}