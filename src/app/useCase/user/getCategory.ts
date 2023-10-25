import { category } from "../../../domain/entities/tutor/category";
import { userRepository } from "../../../infra/repositories/user/userRepository";


export const Category = (userRepository:userRepository)=>
     async():Promise<object[]|undefined>=>{
        
        return await userRepository.AllCategory()
}

export const categoryById = (userRepository:userRepository)=>
        async(id:string):Promise<category|null>=>{
                return  await userRepository.GetcategoryById(id)
        }

        