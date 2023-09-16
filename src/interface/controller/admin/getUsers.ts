import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/userModel";
import userRepositoryImp, { userRepository } from "../../../infra/repositories/user/userRepository";
import { AppError } from "../../../untils/error";
import { getUserById, getUsers, isBlockUser } from "../../../app/useCase/admin/getUsers";



const db = userModel
const userRepository = userRepositoryImp(db)

export const getAllUsers = async(req:Request,res:Response)=>{
    try {
        console.log('hi get all users');
        
        const allUsers = await getUsers (userRepository)()
        console.log(allUsers,'got all users here');
        
        if (!allUsers) {
            throw new AppError("something went wrong ",400)
        }
        res.json({result:allUsers})
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}

export const getUser = async(req:Request,res:Response)=>{
    try {
        const id= req.query.id as string
        const user = await getUserById(userRepository)(id)
        res.json({result:user})
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}

export const BlockUser = async(req:Request,res:Response)=>{

    try {
        console.log('block user');
        
        const {userid,action}  = req.body 
        console.log(userid,action,'req actio user id');
        
        if (!userid||!action)  throw new AppError("somthing went wrong ",500);
       
        const blockeduser = await isBlockUser(userRepository)(userid,action)
        if(blockeduser === null)throw new AppError("something went wrong",500)
        if(blockeduser === true){
            res.status(200).json({message:"user blocked successfully"})
            return
        }else if(blockeduser === false){
            res.status(200).json({message:"user unblocked successfull"})
            return
        }
        console.log(blockeduser,'updated user here');
        
        res.json(blockeduser)

        
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}
