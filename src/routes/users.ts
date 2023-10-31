import express from 'express';

import {
    deleteUser,
    getAllUsers,
    updateUser,
    forgotPassword,
    resetPassword,
} from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';
import { update } from 'lodash';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.put('/users/:id', isAuthenticated, isOwner, updateUser);
    router.post('/users/forgot-password', isAuthenticated, forgotPassword);
    router.post('/users/reset-password', isAuthenticated, resetPassword);
};
