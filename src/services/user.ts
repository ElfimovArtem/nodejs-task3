import { IUserDataHandler } from '../data-access/user';
import { User } from '../types/user';

export interface IUserService {
  getById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User | null>;
  removeSoftly(id: string): Promise<boolean>;
  search(login: any, limit: any): Promise<User[]>;
}

export class UserService implements IUserService {
  constructor(private userDataHandler: IUserDataHandler<User>) {}

  getById(id: string) {
    return this.userDataHandler.getById(id);
  }

  createUser(user: User) {
    return this.userDataHandler.createUser(user);
  }

  async removeSoftly(id: string) {
    const found = await this.getById(id);

    if (!found) {
      throw new Error('User not found!');
    }

    const updatedUser = await this.userDataHandler.updateUser({
      ...found,
      isDeleted: true
    });

    if (!updatedUser) {
      throw new Error('Error while updating!');
    }

    return true;
  }

  async search(login: string, limit: number) {
    const foundUsers = await this.userDataHandler.getByParams(login, limit);

    if (foundUsers) {
      return foundUsers;
    }

    return [];
  }
}