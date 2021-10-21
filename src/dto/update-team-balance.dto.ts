import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Matches } from "class-validator";

export class UpdateTeamBalanceDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    balance: number;
}