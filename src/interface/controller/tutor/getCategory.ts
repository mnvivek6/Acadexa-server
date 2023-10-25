import { Request, Response } from "express";
import { getCategory } from "../../../app/useCase/admin/category";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
import { adminModel } from "../../../infra/database/model/adminModel";

const adminRepository = adminRepositoryImp(adminModel)

export const categories = async(req:Request,res:Response)=>{
    try {

        const response = await getCategory(adminRepository)()
        if(response){
            res.status(200).json(response)
        }
        
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
}