import { ObjectId } from "mongoose"

export type Message ={
    user:ObjectId
    tutor:ObjectId
    content:string
    chat:ObjectId
}