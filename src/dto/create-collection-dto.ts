import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateCollectionDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    averageRating: number;
}