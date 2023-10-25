import { Request, Response } from "express";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { Addclass } from "../../../app/useCase/tutor/addClass";


const db = tutorModel
const tutorRepository = tutorRepositoryImp(db)


export const newClass = async(req:Request,res:Response)=>{
    
    try {
    
     
       const id =  req.params.id
       console.log(id,'from create class');
       
       const Data = req.body.classData
      console.log(req.body.classData,'class datas are here');
      
       
       const classDetails:object ={
        title: Data.title as string,
        description: Data.description as string,
        video: Data.video as string
       }
       
       const createNewClass = await Addclass(tutorRepository)(id,classDetails)
       res.status(200).json({message:createNewClass})
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' }); 
    }
}