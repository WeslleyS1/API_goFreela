import express from 'express';

import { getUserByEmail, createUser } from '../models/users';
import { authentication, generateRandomString } from '../helpers';

// Login
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select(
            '+authentication.salt +authentication.password'
        );

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedPassword = authentication(
            user.authentication.salt,
            password
        );

        // Checking
        if (expectedPassword !== user.authentication.password) {
            return res.sendStatus(403);
        }

        // Session token
        const salt = generateRandomString();
        user.authentication.sessionToken = authentication(
            salt,
            user._id.toString()
        );

        await user.save();

        // Cookie
        res.cookie('GOFREELA-AUTH', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.status(200).json({ user }).end();
    } catch (error) {
        return res.sendStatus(400).json({ error });
    }
};

// Register
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existUser = await getUserByEmail(email);

        if (existUser) {
            return res.sendStatus(400);
        }

        const salt = generateRandomString();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(201).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ error });
    }
};
