import { Course } from "../../../domain/entities/tutor/course";
import { tutorRepository } from "../../../infra/repositories/tutor/tutorRepository";

export const AddCourse = (tutorRepository:tutorRepository)=>{
    
    return async(course:object):Promise<Course>=>{
        return await  tutorRepository.addCourse(course)
    }
}

export const GetCourse = (tutorRepositoty:tutorRepository)=>


     async ():Promise<object[]>=>{
        console.log('get course');
        
        const courses = await tutorRepositoty.getAllCourses()
        console.log(courses,'coures from ');
        
        return courses
}