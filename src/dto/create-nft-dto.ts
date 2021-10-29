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

    @ApiProperty()
    history: Array<string>;

    @IsNotEmpty()
    @ApiProperty()
    belongToCollection: string;

    @IsNotEmpty()
    @ApiProperty()
    rating: number;
}