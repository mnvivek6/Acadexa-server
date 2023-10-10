import mongoose, { Model, Schema,Document } from "mongoose";
import { Message } from "../../../domain/entities/chat/message";


export type mongoDBMessage = Model<Document<any,any,any>&Message>
const MessageSchema = new Schema<Message>({
     
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    tutor:{type:mongoose.Schema.Types.ObjectId,ref:'tutor'},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:'chat'},
    content:{type:String ,trim:true}
})

export const messageModel:mongoDBMessage = mongoose.connection.model<Document<any,any,any>&Message>('message',MessageSchema)