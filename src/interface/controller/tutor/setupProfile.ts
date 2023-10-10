import { Request, Response } from "express";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { SetupProfile } from "../../../app/useCase/tutor/profileSetup";
import { CustomRequest } from "../../middlewares/authMiddleware";

const db = tutorModel
const tutorRepository = tutorRepositoryImp(db)
export interface CourseRequest extends Request {
    tutor?: any
    category?:any

  }

export const tutorProfile = async ( req:CustomRequest,res:Response)=>{

    try {

        const tutorId: string|undefined = req.tutor.tutor._id as string
        console.log(tutorId);
        
    const data = req.body as object as object |any
    console.log(data,'here we get the data');

    
    const tutorData:object ={
        qualification:data.qualification as string,
        experience:data.experience as string,
        aboutme:data.about as string
       
    }

    const createdProfile = await SetupProfile (tutorRepository)(tutorId,tutorData)
     if (createdProfile) {
        res.status(200).json({Message:' tutor Profile created successfully'})
     }
        
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
    

    
}
