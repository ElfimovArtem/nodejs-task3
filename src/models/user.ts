import { Model, DataTypes } from 'sequelize';
import { db } from '../db-init';

export class UserModel extends Model {
  id!: string;
  login!: string;
  password!: string;
  age!: number;
  isDeleted!: boolean;
}

export function initUserModel() {
  UserModel.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize: db,
    modelName: 'users'
  });
}

export function createPredefinedUsers() {
  UserModel.bulkCreate([
    { login: 'user1', password: '12345', age: 82 },
    { login: 'user2', password: 'qwerty', age: 46 },
    { login: 'Ben', password: 'ASDFG', age: 84 },
    { login: 'Artem', password: 'passsssword', age: 29 }
  ])
}