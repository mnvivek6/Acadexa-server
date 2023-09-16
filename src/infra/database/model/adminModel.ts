import mongoose, { Model, Schema,Document } from "mongoose";
import { Admin } from "../../../domain/entities/admin/adminValidation";

export type MongoDBAdmin = Model<Document<any,any,any>& Admin>

const adminSchema = new Schema<Admin>({
    email:{type:String,required:true},
    password:{type:String,required:true}
})

export const adminModel:MongoDBAdmin= mongoose.connection.model<Document<any,any,any>&Admin>('admin',adminSchema)