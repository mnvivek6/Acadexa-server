import mongoose, { Model, Schema,Document } from "mongoose";
import { Tutor } from "../../../domain/entities/tutor/tutorValidation";


export type mongoDBTutor = Model<Document<any,any,any>&Tutor>;

const TutorSchema = new Schema<Tutor>({
    name:{type:String ,required:true},
    email:{type:String, required:true},
    phone:{type:Number, required:true},
    password:{type:String, required:true},
    image:{type:String},
    isBlocked:{type:Boolean, default:false},
    isMailVerified:{type:Boolean, default:false},
    aboutme:{type:String},
    qualification:{type:String},
    certificate:{type:String},
    experience:{
        year:{type:String},
        month:{type:String}
    },
    category:{type:mongoose.Schema.Types.ObjectId ,ref:'category'},
   
},{
    timestamps :{createdAt:true}
})



export const tutorModel: mongoDBTutor = mongoose.connection.model<Document<any,any,any>&Tutor>('tutor',TutorSchema)