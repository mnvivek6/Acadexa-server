import { Request, Response } from "express";
import { adminModel } from "../../../infra/database/model/adminModel";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
import { CreateCategory, EditedCategory, getCategory } from "../../../app/useCase/admin/category";
import { category } from "../../../domain/entities/tutor/category";


const db = adminModel

const adminRepository = adminRepositoryImp(db)



export const addcategory = async(req:Request,res:Response)=>{
    try {
        const category = req.body.CategoryData
        console.log(category,'before creating castegory');  
        const categoryData:category ={
            name:category.name as string,
            description:category.description as string,
            image:category.image as string
        }
        console.log(categoryData);
        
        const createdcategory = CreateCategory(adminRepository)(categoryData)
        if (await createdcategory) {
            res.status(200).json({message:createdcategory})
        }
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
}
export const getcategory = async(req:Request,res:Response)=>{
   
    try {
        const Allcategory = await getCategory(adminRepository)()  
    if(Allcategory){
        res.status(200).json({message:Allcategory})
    }    
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
    
}

export const editCategory = async(req:Request,res:Response)=>{
      
    try {
        const id = req.params.categoryid
        const data = req.body

        const categorydata:category = {
            name:data.name as string,
            description:data.description as string,
            image:data.fileUrl as string

        }
        const response = await EditedCategory(adminRepository)(id,categorydata)
        console.log(response,'response isn here');
        
        console.log(categorydata,'category datas are here');
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
    

}