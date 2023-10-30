import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        lowercase: true
    },
    authentication:{
        password: {
            type: String,
            required: true,
            select: false},
        salt: {
            type: String,
            select: false},
        sessionToken: {
            type: String,
            select: false
        },
    },
    resetPasswordToken: {
      type: String,
      select: false
    },
    resetPasswordExpires: {
      type: Date,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
        
    });

export const UserModel = mongoose.model('User', userSchema);

export const getUsers = () => UserModel.find(); // retorno

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken});

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, {new: true});

userSchema.methods.setResetPasswordToken = function(token, expirationDate) {
    this.resetPasswordToken = token;
    this.resetPasswordExpires = expirationDate;
};