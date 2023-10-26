import { Request, Response } from "express";
import { AllTuTors, SearchTutor, blockedTutor, unverifiedtutors } from "../../../app/useCase/admin/getTutors";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { AppError } from "../../../untils/error";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
import { adminModel } from "../../../infra/database/model/adminModel";

const db = tutorModel

const tutorRepository = tutorRepositoryImp(db)
const adminRepository = adminRepositoryImp(adminModel)

export const getAllTutors = async(req:Request,res:Response)=>{

    try {
        const allTutors = await AllTuTors(tutorRepository)()
        if (!allTutors) {
            throw new AppError("something went wrong ",400)
        }
        console.log(allTutors,'all tutors are here');
        
       res.json({allTutors})
         
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}

export const getTutorsbyName = async(req:Request,res:Response)=>{
    try {
        const searchQuery = req.query.value as string
        const response = await SearchTutor(adminRepository)(searchQuery)
        console.log(response,'daslghytirtetqwsd');
        res.status(200).json(response)
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}
export const tutorBlock = async(req:Request,res:Response)=>{
    try {
        const {tutorid,action} = req.body
        console.log(tutorid,'tutor id is here');
        console.log(action,'action is here ');
        
        
        if (!tutorid||!action)  throw new AppError("somthing went wrong ",500);
        const blockedTuto = await blockedTutor(adminRepository)(tutorid,action)
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}
export const unverifiedTutors = async(req:Request, res:Response)=>{
    try {
        console.log('unverified tutors');
        
        const response = await unverifiedtutors(adminRepository)()
        console.log(response,'response form backend');
        
        if (!response) {
            throw new AppError("something went wrongggg ",400)
        }
      res.status(200).json(response)
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}