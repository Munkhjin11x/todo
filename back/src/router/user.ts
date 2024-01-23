import express from 'express';
import {
  createUser,
  getAllUsers,
  login,
} from '../controller/user';

const user = express.Router();

user.post('/users', createUser);
user.get('/users', getAllUsers);
user.post('/auth', login);

export { user };
