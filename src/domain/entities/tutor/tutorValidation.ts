import { ObjectId } from "mongoose"

export type Tutor = {
    _id:string
    name:string
    email:string
    phone:number
    password:string
    image:string
    isBlocked:boolean
    isMailVerified:boolean
    aboutme:string
    category:ObjectId
    qualification:string
    certificate:string
    experience:object
   
}





