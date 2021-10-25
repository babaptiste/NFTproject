import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateNftDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    image: string;

    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsNotEmpty()
    @ApiProperty()
    status: string;

    @IsNotEmpty()
    @ApiProperty()
    history: string;

    @IsNotEmpty()
    @ApiProperty()
    belongToCollection: string;


    @ApiProperty()
    rating: number;
}