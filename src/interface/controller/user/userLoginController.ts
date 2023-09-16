import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/userModel";
import { User } from "../../../domain/entities/user/userValidation";
import { AppError } from "../../../untils/error";
import { loginUser } from "../../../app/useCase/user/userLogin";
import userRepositoryImp from "../../../infra/repositories/user/userRepository";


const db = userModel
const userRepository = userRepositoryImp(db)

export type userLoginType={
    email:string;
    password:string
}

export const userLogin = async ( req:Request,res:Response)=>{
    try {

        const user:User = req.body
        console.log(user);
        

        const {email,password}= user

        if(!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)){
            throw new AppError ('All fields are required',400)
        }

        const userToken = await loginUser(userRepository)(user)
        console.log(userToken);
        
        res.status(200).json({message:userToken})

    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message|| 'something went wrong'})
    }
}



