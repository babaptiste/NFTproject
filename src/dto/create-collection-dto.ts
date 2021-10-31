import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateCollectionDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    logo: string;


    @ApiProperty()
    status: string;

    @ApiProperty()
    time: Date;

    @ApiProperty()
    rating: string;

    @ApiProperty()
    numberOfSales: number;
}