import { Sequelize } from 'sequelize-typescript';
import { Team } from 'src/entity/team.entity';
import { User } from '../entity/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize('postgresql://localhost/JS');
      sequelize.addModels([User, Team]);
      await sequelize.sync();
      return sequelize;
    },
  },
];