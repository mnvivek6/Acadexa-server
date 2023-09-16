import mongoose, { Model,Document, Schema } from "mongoose";
import { Course } from "../../../domain/entities/tutor/course";

export type mongoDBCourse = Model<Document<any,any,any>&Course>

const CourseSchema = new Schema<Course>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String},
    duration:{type:String,required:true},
    unlist:{type:Boolean,default:false},
    level:{type:String, enum:['beginner','advanced','intermediate']},
    coursefee:{type:String, required:true},
    tutor:{type:mongoose.Schema.Types.ObjectId,ref:'Tutor'},
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    classes:[{
        title:{type:String},
        description:{type:String},
        vedeo:{type:String}
    }]

},{
    timestamps:{createdAt:true}
})

export const courseModel:mongoDBCourse = mongoose.connection.model<Document<any,any,any>&Course>('course',CourseSchema)