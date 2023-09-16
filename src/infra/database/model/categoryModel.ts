import mongoose, { Model,Document, Schema, mongo } from "mongoose";
import { category } from "../../../domain/entities/tutor/category";



export type mongoDBCategory = Model<Document<any,any,any>&category>

const CategorySchema = new Schema<category>({
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String}
})

export const categoryModel:mongoDBCategory=mongoose.connection.model<Document<any,any,any>&category>('category',CategorySchema)