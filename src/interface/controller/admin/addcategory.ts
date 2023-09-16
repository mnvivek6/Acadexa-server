import { Request, Response } from "express";
import { adminModel } from "../../../infra/database/model/adminModel";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
import { CreateCategory, getCategory } from "../../../app/useCase/admin/category";
import { category } from "../../../domain/entities/tutor/category";


const db = adminModel

const adminRepository = adminRepositoryImp(db)



export const addcategory = async(req:Request,res:Response)=>{


    try {
        const category = req.body
        console.log(category,'before creating');
        
         
        const categoryData:category ={
            name:category.CategoryName as string,
            description:category.description as string,
            image:category.fileUrl as string
        }
        console.log(categoryData);
        
        const createdcategory = CreateCategory(adminRepository)(categoryData)
        if (await createdcategory) {
            res.status(200).json({message:createdcategory})
        }
    } catch (error:any) {
       
    }
}

export const getcategory = async(req:Request,res:Response)=>{
   
    try {

        const Allcategory = await getCategory(adminRepository)()
        console.log(Allcategory,'all category form backend');
        
    if(Allcategory){
        
        res.status(200).json({message:Allcategory})
    }
        
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
    
}