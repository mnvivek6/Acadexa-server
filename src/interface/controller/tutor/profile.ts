import { Request, Response } from "express";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { Tutorverification, ViewProfile } from "../../../app/useCase/tutor/profileSetup";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { Tutor } from "../../../domain/entities/tutor/tutorValidation";


const db = tutorModel
const tutorRepository = tutorRepositoryImp(db)

export const profile = async(req:CustomRequest,res:Response)=>{
    try {
        
        const tutorId: string | undefined = req.tutor.tutor._id
        console.log(tutorId,'tutor id is here');

        const tutor = await ViewProfile(tutorRepository)(tutorId as string) 
        console.log(tutor,'tutor profile from vei');
        
        res.json(tutor)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({message:error.message||'something went wrong'})
    }
}
export const TutorVerification = async(req:Request,res:Response)=>{
    try {
        console.log('verify tutor');
        
         const tutorid = req.params.tutorid
         console.log(tutorid,'tutor id is here');
         
        const data = req.body
        console.log(data,'datas are here');
        
        const tutordetails ={
            qualification:data.verificationData.Qualification,
            experience:{
                year:Number(data.verificationData.years),
                month:Number(data.verificationData.months)
            },
            certificate:data.verificationData.fileUrl,
            category:data.verificationData.selectedCategory

        }
         console.log(tutordetails,'tutor details');
         
        const response = await Tutorverification(tutorRepository)(tutordetails,tutorid) 
        if(!response){
            return res.sendStatus(401);
        }
        res.status(200).json(response)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({message:error.message||'something went wrong'})
    }
}
