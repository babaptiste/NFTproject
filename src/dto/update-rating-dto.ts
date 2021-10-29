import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Matches } from "class-validator";

export class UpdateRatingDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    rating: number;
}