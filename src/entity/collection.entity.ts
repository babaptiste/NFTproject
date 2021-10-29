import { Table, Column, Model, Unique, AllowNull, Is, IsEmail, ForeignKey } from 'sequelize-typescript';

@Table
export class Collection extends Model {

  @AllowNull(false)
  @Column
  name: string;

  @Column
  logo: string;

  @Column
  status: string;

  @Column
  time: Date;

  @AllowNull(true)
  @Column
  rating: string;

}