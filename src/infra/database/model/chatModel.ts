import mongoose, { Model, Schema,Document } from "mongoose";
import { Chat } from "../../../domain/entities/chat/chat";


export type mongoDBChat = Model<Document<any,any,any>&Chat>
const ChatSchema = new Schema<Chat>({
    chatname:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    tutor:{type:mongoose.Schema.Types.ObjectId,ref:'tutor'},
    
})

export const chatModel:mongoDBChat = mongoose.connection.model<Document<any,any,any>&Chat>('chat',ChatSchema)