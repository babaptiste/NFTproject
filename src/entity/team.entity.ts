import { Table, Column, Model, Unique, AllowNull, Is, IsEmail, ForeignKey, Default } from 'sequelize-typescript';

@Table
export class Team extends Model {

  @AllowNull(false)
  @Column
  name: string;

  @Default(0)
  @Column
  balance: number;

  @Default(0)
  @Column
  numberOfSales: number;
}