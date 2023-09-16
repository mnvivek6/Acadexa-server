import { adminModel } from "../../../infra/database/model/adminModel";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
import { Request,Response } from "express";
import { AppError } from "../../../untils/error";
import { loginAdmin } from "../../../app/useCase/admin/adminLogin";


const db = adminModel
const  adminRepository = adminRepositoryImp(db)

export type adminLoginType ={
    _id:string
    email:string,
    password:string
    phone:string
}

export const adminLogin = async( req:Request,res:Response)=>{
    try {
        
        const admin= req.body
        console.log(admin,'log from adminlogin');
        
        const {email,password}=admin
        console.log(email,'from before if');
        
        
        if (!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)) {
            console.log(/^\s*$/.test(email));
            
           throw new AppError('All fields are required', 400);
         }

        
        
        const adminToken = await loginAdmin(adminRepository)(admin)
        console.log(adminToken,'admin token created success fullly');
        
       
        
        res.status(200).json({adminToken})
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}