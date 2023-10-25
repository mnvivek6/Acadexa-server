import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/userModel";
import userRepositoryImp, { userDetails } from "../../../infra/repositories/user/userRepository";
import { IDRequest } from "../../middlewares/ClientauthMiddleware";
import { UserProfile, editProfile } from "../../../app/useCase/user/profile";
import { Checkingpurchasedornot, PurchasedCourse } from "../../../app/useCase/user/payment";
import { Payment } from "../../../domain/entities/tutor/payment";
import { ObjectId } from "mongoose";
import { Course } from "../../../domain/entities/tutor/course";

const db = userModel

const userRepository = userRepositoryImp(db)

export interface purchasedcourse {
    _id:string
    amount:string
    tutor:ObjectId
    user:ObjectId
    course:Course[]

}
export const profile = async(req:IDRequest,res:Response)=>{

    try {
        const id = req.user.user._id
        const user = await UserProfile(userRepository)(id) 
        res.status(200).json(user)
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'}) 
    }
}

export const EditedProfile = async(req:IDRequest,res:Response)=>{

    try {
         
        const id = req.user.user._id
        const data = req.body as userDetails
        const userDetails:userDetails ={
            name:data.name as string,
            email : data.email as string,
            phone: data.phone as string,
            fileUrl: data.fileUrl as string
        }
        const response= await editProfile(userRepository)(id,userDetails) 
        res.status(200).json(response)
    } catch (error:any) {  
        res.status(500).json({message:error.message||'something went wrong'}) 
    }
}

export const purchasedcourse = async(req:IDRequest,res:Response)=>{

    try {
        
        const id = req.user.user._id
        const response = await PurchasedCourse(userRepository)(id)
         
        res.status(200).json(response)
    } catch (error:any) {
        console.log(error);
        res.status(500).json({message:error.message||'something went wrong'}) 
    }
}
export const Chekingpurchased = async(req:IDRequest,res:Response)=>{
    try {
       
        console.log('checking the fuunction ');
        
        const userid = req.user.user._id
        console.log(userid);
        const courseid = req.params.courseid
        console.log(courseid);

        const response = await Checkingpurchasedornot(userRepository)(courseid,userid)
        console.log(response,'response is here');
        
        res.status(200).json(response)
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'}) 
    }
}