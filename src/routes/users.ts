import express from 'express';

import { deleteUser, getAllUsers, updateUser } from '../controllers/users'; 
import { isAuthenticated, isOwner } from '../middlewares';
import { update } from 'lodash';
// import { googleOAuthHandler } from '../controllers/authentication';

export default (router: express.Router) => {
    router.get('/users',isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.put('/users/:id', isAuthenticated, isOwner, updateUser);
    // router.get('/api/sessions/oauth/google', googleOAuthHandler);
};