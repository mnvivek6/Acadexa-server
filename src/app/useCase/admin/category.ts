
import { category } from "../../../domain/entities/tutor/category";
import { adminRepository } from "../../../infra/repositories/admin/adminRepository";

export const CreateCategory = (adminRepository:adminRepository)=>{

    return async (categoryData:category):Promise<category>=>{
        const category=await adminRepository.Addcategory(categoryData)
        return category
    }
}

export const getCategory = (adminRepository:adminRepository)=>
     async ():Promise<object[]|null>=>{
        const categories = await  adminRepository.getcategory()
        return categories
}
export const EditedCategory=(adminRepository:adminRepository)=>
async(id:string,categorydata:object):Promise<category|null>=>{
    const category = await adminRepository.editCategory(id,categorydata)
    return category
}
