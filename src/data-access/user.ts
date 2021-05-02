import { Op } from 'sequelize';
import { UserModel, initUserModel, createPredefinedUsers } from '../models/user';

import { User } from '../types/user';

function convertToUser(model: UserModel): User | null {
  if (!model) {
    return null;
  }

  return {
    id: model.id,
    login: model.login,
    password: model.password,
    age: model.age,
    isDeleted: model.isDeleted
  };
}

export interface IUserDataHandler<T> {
  getById(id: string): Promise<T | null>;
  createUser(user: User): Promise<User | null>;
  updateUser(user: User): Promise<User | null>;
  getByParams(regexpString: string, limit?: number | undefined): Promise<User[]>;
}

export class userDataHandler implements IUserDataHandler<User> {
  constructor() {
    initUserModel();

    UserModel
      .sync({ force: true })
      .then(() => createPredefinedUsers());
  }

  async getById(id: string): Promise<User | null> {
    const user = await UserModel.findByPk(id);

    return convertToUser(user);
  }

  async createUser(user: User): Promise<User | null> {
    const newUser = await UserModel.create({
      id: user.id,
      login: user.login,
      password: user.password,
      age: user.age,
      isDeleted: user.isDeleted
    });

    return convertToUser(newUser);
  }

  async updateUser(user: User): Promise<User | null> {
    const found: UserModel = await UserModel.findByPk(user && user.id);

    const updatedUser =  await found && found.update({
      login: user.login,
      password: user.password,
      age: user.age,
      is_deleted: user.isDeleted
    });

    return convertToUser(updatedUser);
  }

  async getByParams(regexpString: string, limit?: number | undefined): Promise<User[]> {
    const users = await UserModel.findAll({
      where: {
        login: {
          [Op.iRegexp]: regexpString
        }
      },
      limit
    });

    return users.map(convertToUser);
  }
}