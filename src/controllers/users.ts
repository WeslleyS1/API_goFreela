import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../models/users';
import { get } from 'lodash';


// Get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({error});
    }
}

// Delete user by id
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deleteUser = await deleteUserById(id);

        return res.status(200).json({deleteUser});
    } catch (error) {
        return res.status(500).json({error});
    }
}

// update user
export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const { username } = req.body;

        if(!username) {return res.status(400);}

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json({user}).end();
    }catch(error){
        return res.status(500).json({error});
    }
}