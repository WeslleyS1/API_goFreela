import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    authentication: {
      password: {
        type: String,
        required: true,
        select: false,
      },
      salt: {
        type: String,
        select: false,
      },
      sessionToken: {
        type: String,
        select: false,
      },
    },
<<<<<<< HEAD
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
=======
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
>>>>>>> c32413ec9161c4fae195a2a53fffdf5066016fe4

export interface UserDocument extends mongoose.Document {
  email: string;
  username: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  picture: string;
}

<<<<<<< HEAD
export const getUsers = () => UserModel.find(); // retorno

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
=======
export const UserModel = mongoose.model("User", userSchema);

export const getUsers = () => UserModel.find(); // retorno
>>>>>>> c32413ec9161c4fae195a2a53fffdf5066016fe4

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

<<<<<<< HEAD
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, {new: true});

userSchema.methods.setResetPasswordToken = function(token, expirationDate) {
    this.resetPasswordToken = token;
    this.resetPasswordExpires = expirationDate;
};
=======
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values, { new: true });
>>>>>>> c32413ec9161c4fae195a2a53fffdf5066016fe4
