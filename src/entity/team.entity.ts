import { Table, Column, Model, Unique, AllowNull, Is, IsEmail, ForeignKey } from 'sequelize-typescript';

@Table
export class Team extends Model {

  @AllowNull(false)
  @Column
  name: string;

  @Column
  balance: number;

}