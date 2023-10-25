import { ObjectId } from "mongoose"
import { User } from "../user/userValidation"
import { Tutor } from "../tutor/tutorValidation"

export type Chat ={
    _id:string
    chatname:string
    user?:User
    tutor?:Tutor
    lastestMessage?:ObjectId
}