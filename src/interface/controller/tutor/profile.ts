import { Request, Response } from "express";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { ViewProfile } from "../../../app/useCase/tutor/profileSetup";
import { CustomRequest } from "../../middlewares/authMiddleware";


const db = tutorModel
const tutorRepository = tutorRepositoryImp(db)

export const profile = async(req:CustomRequest,res:Response)=>{
    try {
        
        const tutorId: string | undefined = req.tutor.tutor._id

       
       
        
        const tutor = await ViewProfile(tutorRepository)(tutorId as string) 
        console.log(tutor,'tutor profile from vei');
        
        res.json(tutor)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({message:error.message||'something went wrong'})
    }
}