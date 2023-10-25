import { User } from "../../../domain/entities/user/userValidation"
import { userRepository } from "../../../infra/repositories/user/userRepository"
import { userLoginType } from "../../../interface/controller/user/userLoginController"
import { AppError } from "../../../untils/error"
import { createToken, passwordCompare } from "./userValidationHelper"

type userReturnType ={
    token:string
    status:string
}

export const loginUser = (userRepository:userRepository)=>{

    console.log('login user useCase');
    
    return async(user:userLoginType):Promise<userReturnType>=>{
        
        const {email,password}= user
        const isUserExist =await userRepository.findOneUserByEmail(email)
        console.log(isUserExist,'is user exist ');
        if(!isUserExist){
            throw new AppError('user is not exist',400)
        }
        const Blockeduser = await userRepository.findBlockedUser(email)
        console.log(Blockeduser)
        if (Blockeduser)  throw new AppError('User is Blocked from admin',400)
        
        const MailVerified = await userRepository.CheckMailverification(email)
         if (MailVerified)  throw new AppError('Your email is not verified',400)
      
       
        const ispasswordCorrect = await passwordCompare(password,isUserExist.password)
        if (!ispasswordCorrect) {
            throw new AppError('incorrect password',401)
        }
        console.log(ispasswordCorrect);
        
        const userToken = await createToken(isUserExist)
        const verifiedUser = {
            token:userToken,
            status:'login success'
        }
        console.log(userToken);
        
        return verifiedUser
    }
}