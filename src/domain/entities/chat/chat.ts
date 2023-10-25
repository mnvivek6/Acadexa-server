import { ObjectId } from "mongoose"

export type Chat ={
    chatname:string
    user:ObjectId
    tutor:ObjectId
    lastestMessage:ObjectId
}