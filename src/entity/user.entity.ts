import { Table, Column, Model, Unique, AllowNull, Is, IsEmail, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize/types';
import Sequelize from 'sequelize/types/lib/sequelize';
import { Role } from 'src/role/role.enum';
import { Team } from './team.entity';
import { DataType } from 'sequelize-typescript';

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

  /*@Column(DataType.ENUM("user", "admin"))
  role: string*/

  @Column({ type: DataType.ENUM, values: ["user", "admin"] })
  roles: Role
}