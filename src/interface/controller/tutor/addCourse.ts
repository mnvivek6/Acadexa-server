import { Request, Response } from "express";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { Course } from "../../../domain/entities/tutor/course";
import { AddCourse, GetCourse } from "../../../app/useCase/tutor/addCourse";
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

export const AllCourses = async(req:Request,res:Response)=>{
    try {
        
        const allCourses = await GetCourse(tutorRepository)()
        if (allCourses) {
            res.status(200).json({message:allCourses})
        }
    } catch (error:any) {
        res.status(500).json({message:error.message||' something went wrong'})
    }
}
