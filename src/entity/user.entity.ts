import { Table, Column, Model, Unique, AllowNull, Is, IsEmail, ForeignKey } from 'sequelize-typescript';
import { Team } from './team.entity';

@Table
export class User extends Model {
 
  @AllowNull(false)
  @Is(/^0x[a-fA-F0-9]{40}/)
  @Column
  address: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @IsEmail
  @Unique(true)
  @Column
  email: string;

  @Column
  password: string;

  @ForeignKey(() => Team)
  @Column
  teamId: number;

}