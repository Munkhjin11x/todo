import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
} from '../controller/user';

const user = express.Router();

user.post('/users', createUser);
user.get('/users', getAllUsers);
user.get('/users/:id', getUserById);

export { user };
