import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../models/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId) {return res.sendStatus(403);}

        if (currentUserId.toString() !== id) {return res.sendStatus(403);}

        next();
    }catch(error){
        return res.sendStatus(500).json({error});
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['GOFREELA-AUTH'];

        if(!sessionToken) {return res.sendStatus(401);}

        const existUser = await getUserBySessionToken(sessionToken);

        if(!existUser) {return res.sendStatus(401);}

        merge(req, {identity: existUser});

        return next();
    }catch(error){
        return res.sendStatus(500).json({error});
    }
}