import { Course } from "../../../domain/entities/tutor/course";
import { userRepository } from "../../../infra/repositories/user/userRepository";


export const course = (userRepository:userRepository)=>
async():Promise<object[]|undefined>=>{
    return await userRepository.AllCourse()
}

export const CourseById = (userRepository:userRepository)=>
async(id : string): Promise<any | undefined > =>{
    return  await userRepository.GetCourseById(id)
}

export const courseByTUtor =(userRepository:userRepository)=>
async(id:string):Promise<object[]>=>{
    return await userRepository.GetCourseByTutor(id)
}

export const findCoursebyCategory = (userRepository:userRepository)=>
async(categoryid:string):Promise<Course[]|undefined>=>{
    return await userRepository.findCourseByCategory(categoryid)
}
