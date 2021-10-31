import { DataType,Table, Column, Model, Unique, AllowNull, Is, IsEmail, ForeignKey } from 'sequelize-typescript';

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

  @Column({type: DataType.ARRAY(DataType.STRING)})
  history: Array<string>;

  @Column
  belongToCollection: string;

  @Column
  rating: number;

  @Column
  date: Date;


}