import { Table, Column, Model, Unique, AllowNull, Is, IsEmail, ForeignKey } from 'sequelize-typescript';

@Table
export class Nft extends Model {

  @AllowNull(false)
  @Column
  name: string;

  @Column
  image: string;

  @Column
  price: number;

  @Column
  status: string;

  @Column
  history: string;

  @Column
  belongToCollection: string;

  @Column
  rating: number;



}