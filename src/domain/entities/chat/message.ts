import { ObjectId } from "mongoose"
import { User } from "../user/userValidation"
import { Tutor } from "../tutor/tutorValidation"
import { Chat } from "./chat"

export type Message ={
    user:ObjectId
    tutor:ObjectId
    content:string
    chat:ObjectId
}

export interface newMessageReceived{
    _id:string,
    user:User,
    tutor:Tutor,
    content:string,
    chat:Chat
}