import { ObjectId } from "mongoose"

export type Payment ={
    user:ObjectId
    course:ObjectId
    tutor:ObjectId
    amount:string
}