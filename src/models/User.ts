import * as crypto from "crypto";
import * as  mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;
    name: string;
    password:string;
};

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: { type: String },
        name: String,
        password:{ type: String, default:'123456'}
    },
    { timestamps: true },
);
export const User = mongoose.model<UserDocument>("User", userSchema);
