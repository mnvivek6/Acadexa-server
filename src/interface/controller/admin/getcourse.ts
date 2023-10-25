import { Request, Response } from "express";
import { adminModel } from "../../../infra/database/model/adminModel";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
import { courses, searchcourse } from "../../../app/useCase/admin/course";

const adminRepository = adminRepositoryImp(adminModel)

export const Courses = async(req:Request,res:Response)=>{
    try {
        
        const response = await courses(adminRepository)()
        console.log(response,'all courses is here');
        res.status(200).json(response)
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}
export const searchCourseByname = async(req:Request,res:Response)=>{
    try {
        

        let sortCriteria: Object = {};

    if (req.query.sort && req.query.sort === 'coursefee-1') sortCriteria = { coursefee: -1 }
    else if (req.query.sort && req.query.sort === 'coursefee1') sortCriteria = { coursefee: 1 }
    else if (req.query.sort && req.query.sort === 'duration-1') sortCriteria = { duration: -1 }
    else if (req.query.sort && req.query.sort === 'duration1') sortCriteria = { duration: 1 }
    else {}
     
    let searchQuery = req.query.value as string
    console.log(searchQuery,'qwertyuiop');
    
    const respone = await searchcourse(adminRepository)(searchQuery,sortCriteria)
    console.log(respone,'response are here');
    
    res.status(200).json(respone)

    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}