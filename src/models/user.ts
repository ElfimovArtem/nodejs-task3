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