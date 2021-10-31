import { Sequelize } from 'sequelize-typescript';
import { Collection } from 'src/entity/collection.entity';
import { Nft } from 'src/entity/nft.entity';
import { Team } from 'src/entity/team.entity';
import { User } from '../entity/user.entity';
import { DataTypes } from 'sequelize/types';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize('postgresql://localhost/JS');
      sequelize.addModels([User, Team, Nft, Collection]);
      await sequelize.sync();
      return sequelize;
    },
  },
];