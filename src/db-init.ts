import { Sequelize } from 'sequelize';

export const db = new Sequelize(
  'node-js-epam-mentoring',
  'postgres',
  'YofGawciHetbit9',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);