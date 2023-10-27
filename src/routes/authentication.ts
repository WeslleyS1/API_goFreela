import express from 'express';

import { register } from '../controllers/authController';

export default (router: express.Router) => {
    router.post('/auth/register', register);
};
