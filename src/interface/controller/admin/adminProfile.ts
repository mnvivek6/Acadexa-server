
import { adminModel } from "../../../infra/database/model/adminModel";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
import { Request, Response } from "express";
import { UpdateAdminProfile, getAdminById } from "../../../app/useCase/admin/adminDetails";


const db = adminModel
const adminRepository = adminRepositoryImp(db)



export const UpdateProfile = async (req:Request,res:Response)=>{

    try {
        const adminId:string|undefined = req.query.Id as string
        const data = req.body as object|any
        
        const adminData:object ={
         name:data.name as string,
         email :data.email as string ,
         phone:data.phone as string,
         password:data.password as string,
        }

        const updatedProfile = await UpdateAdminProfile(adminRepository)(adminId,adminData)
        if (updatedProfile) {
         res.status(200).json({message:'AdminData updated successfully'})
         }
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
}
 
