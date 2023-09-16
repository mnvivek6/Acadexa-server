import { adminRepository } from "../../../infra/repositories/admin/adminRepository"
import { adminLoginType } from "../../../interface/controller/admin/adminLoginController"
import { AppError } from "../../../untils/error"
import { createToken } from "../admin/adminValidation"
import { passwordCompare } from "./adminValidation"

type adminReturnType = {
    token:string,
    status:string
}

export const loginAdmin =(adminRepository:adminRepository)=>{

    console.log('from admin login');
    

    return async (admin:adminLoginType):Promise<adminReturnType>=>{
        const {email,password}= admin
        console.log(email,password,'pass word and email reaached chere');
        
        const isadminExist:adminLoginType|null = await adminRepository.findAdminbyEmail(email)
        if(!isadminExist){
            throw new AppError('admin is not exist',400)

        }
       
        
        const ispasswordCorrect = await passwordCompare(password,isadminExist.password)
        console.log(ispasswordCorrect,'compaared passowrd');
        
        const adminToken = await createToken(isadminExist)
        const verification={
            token:adminToken,
            status:'login success'
        }
        return verification
    }
}