import express from 'express';
import { Request, Response } from 'express';
import { deleteUserById, getUserById, getUsers } from '../models/users';
import { generateRandomString } from '../helpers';
import { UserModel } from '../models/users';
import { sendPasswordResetEmail } from '../services/emailService';


import { get } from 'lodash';

// Get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

// Delete user by id
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await deleteUserById(id);
        return res.status(200).json({ deleteUser });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

// Update user
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json({ user }).end();
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'E-mail is required' });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'E-mail not found' });
        }

        const salt = generateRandomString();
        const resetToken = generateRandomString();

        user.authentication.salt = salt;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

        await user.save();

        // Envie um e-mail com o token de redefinição de senha para o usuário
        sendPasswordResetEmail(user.email, resetToken);

        return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        return res.status(500).json({ error });
    }
}


export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, resetCode, newPassword } = req.body;

        if (!email || !resetCode || !newPassword) {
            return res.status(400).json({ error: 'Email, reset code, and new password are required.' });
        }

        // Encontre o usuário com base no e-mail e no código de redefinição
        const user = await UserModel.findOne({ email, resetPasswordToken: resetCode });

        if (!user) {
            return res.status(404).json({ error: 'Invalid reset code or email.' });
        }

        // Defina a nova senha para o usuário dentro do objeto "authentication"
        user.authentication.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while resetting the password.' });
    }
}

