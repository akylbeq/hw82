import mongoose, {Model, Schema} from "mongoose";
import bcrypt from 'bcrypt';
import {UserFields} from "../types";
import {randomUUID} from "node:crypto";

const SALT_WORK_FACTOR = 10;

interface UserMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
    return await  bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = async function () {
    this.token = randomUUID();
}

UserSchema.set('toJSON', {
    transform: (_doc, ret: Partial<UserFields>) => {
        delete ret.password;
        return ret;

    }
});

const User = mongoose.model("User", UserSchema);
export default User;