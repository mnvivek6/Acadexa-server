import { userRepository } from "../../../infra/repositories/user/userRepository";
import { AppError } from "../../../untils/error";

export const getUsers=(userRepository:userRepository)=>
    async ():Promise<object[]|null>=>{
        const users = await userRepository.getAllUsers()
        return users
}
export const getUserById = (userRepository:userRepository)=>
async(id:string):Promise<object|null>=>{
    const users = await userRepository.getUserById(id)
    return users
}
export const isBlockUser = (userRepository:userRepository)=>{

return    async(userid:string,action:string):Promise<boolean|undefined>=>{

        const blockeduser =  await userRepository.UpdateIsblock(userid,action)
       if (blockeduser) {
        return blockeduser
       }
       return blockeduser
        
    }
}
