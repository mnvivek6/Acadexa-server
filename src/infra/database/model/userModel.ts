import mongoose, { Model, Schema, Document } from "mongoose";
import { User } from "../../../domain/entities/user/userValidation";

export type MongoDBUser = Model<Document<any, any, any>&User>;

const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    isMailvarified: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    image:{type:String}

})

export const userModel: MongoDBUser = mongoose.connection.model<Document<any, any, any>&User>('user', UserSchema)