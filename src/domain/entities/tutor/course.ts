import { ObjectId } from "mongoose"

export type Course ={

    title:string,
    description:string
    image:string
    duration:string
    unlist:boolean
    level:string
    category:ObjectId
    tutor:ObjectId
    coursefee:string
    classes:[{
        title:string,
        description: string;
        vedeo:string
    }]
}