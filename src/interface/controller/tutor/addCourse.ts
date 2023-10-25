import { Request, Response } from "express";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { Course } from "../../../domain/entities/tutor/course";
import { AddCourse, GetCourse, SigleCourse, purchasedusers, totalrevenue } from "../../../app/useCase/tutor/addCourse";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { categoryModel } from "../../../infra/database/model/categoryModel";


const db = tutorModel

const tutorRepository = tutorRepositoryImp(db)



export const CreateCourse = async (req:CustomRequest , res:Response)=>{

    try {
        console.log('hi');
        const id = req.tutor.tutor._id
        console.log(id,'user id ');
        console.log(req.body,'from body ');
        
        const {title,description,coursefee,duration,level,selectedCategory,fileUrl} = req.body

        const category = await categoryModel.findOne({name:selectedCategory})
        console.log(category?._id,'find category');
        const courseData  ={
            title:title,
            description:description,
            level:level,
            coursefee:coursefee,
            duration:duration,
            tutor:id,
            category:category?._id,
            image:fileUrl
        }

        const createdCourse = await AddCourse(tutorRepository)(courseData)

        res.status(200).json({ message: 'Course created successfully', course: createdCourse });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' }); 
    }
}

export const AllCourses = async(req:CustomRequest,res:Response)=>{
    try {
        const id = req.tutor.tutor._id
        console.log(id,'tutor id is hereeeeeeeeeeee');
        
        const allCourses = await GetCourse(tutorRepository)(id)
        
        
        if (allCourses) {
            res.status(200).json({message:allCourses})
        }
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
}

export const SigleCourseById = async(req:Request,res:Response)=>{


    console.log('log from sigle course by id');
    
    try {
        const id :string= req.params.id as string
        const singleCourse:Course|null = await SigleCourse(tutorRepository)(id)

        if (singleCourse) {
            res.status(200).json({singleCourse})
        } 
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
}
export const PurchasedUsers = async(req:Request,res:Response)=>{

    try {
        const courseid :string = req.params.id as string
        console.log(courseid,'course id is here');
        
        const response = await purchasedusers(tutorRepository)(courseid)
        console.log(response,'response herer');
        
        res.status(200).json(response)
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
}
export const TotalRevenue = async(req:CustomRequest,res:Response)=>{
    try {
        
        const tutorid = req.tutor.tutor._id
        const response = await totalrevenue(tutorRepository)(tutorid)
        res.status(200).json(response)
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
}
