import express from 'express';
import { createUserRouter } from './routers/user';
import { UserService } from './services/user';
import { db } from './db-init';
import { userDataHandler } from './data-access/user';

const app = express();

app.listen(8080);
app.use(express.json());

const accessorToUserData = new userDataHandler();
const userService = new UserService(accessorToUserData);

app.use('/', createUserRouter(userService));

async function trySql() {
  try {
    await db.authenticate();
    console.log('Connection has been successfully.');
  } catch (error) {
    console.error('Unable to connect:', error);
  }
}

trySql();