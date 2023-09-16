
import { category } from "../../../domain/entities/tutor/category";
import { adminRepository } from "../../../infra/repositories/admin/adminRepository";

export const CreateCategory = (adminRepository:adminRepository)=>{

    return async (categoryData:category):Promise<category>=>{
        const category=await adminRepository.Addcategory(categoryData)
        return category
    }
}

export const getCategory = (adminrepository:adminRepository)=>
     async ():Promise<object[]|null>=>{
        const categories = await  adminrepository.getcategory()
        return categories
    
}
