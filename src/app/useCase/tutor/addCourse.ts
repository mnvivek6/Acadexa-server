import { Course } from "../../../domain/entities/tutor/course";
import { tutorRepository } from "../../../infra/repositories/tutor/tutorRepository";

export const AddCourse = (tutorRepository:tutorRepository)=>{
    
    return async(course:object):Promise<Course>=>{
        return await  tutorRepository.addCourse(course)
    }
}

export const GetCourse = (tutorRepositoty:tutorRepository)=>

     async (id:string):Promise<object[]>=>{
        console.log('get course');
        const courses = await tutorRepositoty.getAllCourses(id)
        console.log(courses,'coures from ');
        
        return courses
}

export const SigleCourse =(tutorRepository:tutorRepository)=>

    async (id:string):Promise<Course>=>{
        const siglecourse:Course = await tutorRepository.GetSigleCourse(id)

        return siglecourse
    }
