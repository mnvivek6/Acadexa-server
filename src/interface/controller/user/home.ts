import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/userModel";
import userRepositoryImp from "../../../infra/repositories/user/userRepository";
import { Category, categoryById } from "../../../app/useCase/user/getCategory";
import { course, CourseById, courseByTUtor, findCoursebyCategory } from "../../../app/useCase/user/getCourse";
import { IDRequest } from "../../middlewares/ClientauthMiddleware";
import { GetTutor } from "../../../app/useCase/user/getTutor";



const db = userModel

const userRepository = userRepositoryImp(db)

export const categories = async(req:Request,res:Response)=>{

    try {
        const id = req.params.id
        const Allcategory = await Category(userRepository)()
        if (Allcategory) {
            res.status(200).json({Allcategory})
        }
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
}


export const coursee = async(req:IDRequest,res:Response)=>{

    try {
         
        const allcourse = await course(userRepository)()
    if (allcourse) {
        res.status(200).json({allcourse})
    }   
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
    
}

export const sigelCourse = async(req:Request,res:Response)=>{

    try {

        const id = req.params.id
        const singleCourse = await CourseById(userRepository)(id)
        if (singleCourse) {
            res.status(200).json({singleCourse})
        }
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
}
export const CategoryByid = async(req:Request,res:Response)=>{

    try {
        const id = req.params.id
        const response = await categoryById(userRepository)(id)
        if (response) {
            res.status(200).json({response})
        }
        
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
}
export const SingleTutor = async(req:Request,res:Response)=>{

    try {  
        const id = req.params.tutor
        // console.log(id,'tutor id is here');
        
        const response = await GetTutor(userRepository)(id)
        // console.log(response,'tutor by id is here');
        
        if (response) {
            res.status(200).json({response})
        }
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
}
export const CourseByIdTUtor = async(req:Request,res:Response)=>{

    try {
        const id = req.query.id as string
        const response = await courseByTUtor(userRepository)(id)
        // console.log(response,'course by tutor id');
        
        if (response) {
            res.status(200).json({response})
        }
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
}

export const findCoursebycategory = async(req:Request,res:Response)=>{
    try {
        const categoryid = req.params.id as string
        // console.log(categoryid,'category id got here');
        
        const response = await findCoursebyCategory(userRepository)(categoryid)
        // console.log(response,'respnse got ere');
        
        res.status(200).json(response)
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
}