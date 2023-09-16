import { Tutor } from "../../../domain/entities/tutor/tutorValidation";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { Request, Response } from "express";
import { AppError } from "../../../untils/error";
import { loginTutor } from "../../../app/useCase/tutor/tutorLogin";

const db = tutorModel

const tutorRepository = tutorRepositoryImp(db)


export const tutorLogin = async ( req:Request,res:Response)=>{
    try {
        const tutor:Tutor = req.body
          const {email,password} = tutor
        if(!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)){
            throw new AppError ('All fields are required',400)
        }
        const tutorToken = await loginTutor(tutorRepository)(tutor)
        console.log(tutorToken);

        res.status(200).json({tutorToken})
        
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||'something went wrong'})
    }
}