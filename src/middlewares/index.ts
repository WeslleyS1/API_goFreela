import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../models/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId) {return res.status(403);}

        if (currentUserId.toString() !== id) {return res.status(403);}

        next();
    }catch(error){
        return res.status(500).json({error});
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['GOFREELA-AUTH'];

        if(!sessionToken) {return res.status(403);}

        const existUser = await getUserBySessionToken(sessionToken);

        if(!existUser) {return res.status(403);}

        merge(req, { identity: existUser });

        return next();
    }catch(error){
        return res.status(500).json({error});
    }
}