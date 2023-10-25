import { Course } from "../../../domain/entities/tutor/course";
import { Payment } from "../../../domain/entities/tutor/payment";
import { User } from "../../../domain/entities/user/userValidation";
import tutorRepositoryImp, { tutorRepository } from "../../../infra/repositories/tutor/tutorRepository";
// import { tutorAuthToken } from "../../../interface/middlewares/authMiddleware";

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

    export const purchasedusers = (tutorRepository:tutorRepository)=>
    async(courseid:string):Promise<User[]|undefined>=>{
        const users:User[]|undefined = await tutorRepository.purchasedTutors(courseid)
        return users
    }

    export const totalrevenue = (tutorRepository:tutorRepository)=>
      async(tutorid:string):Promise<Payment[]|undefined>=>{
        const revenue :Payment[]|undefined = await tutorRepository.TotalRevenue(tutorid)
        return revenue;
      }

      export const categorywiserevenue = (tutorRepository:tutorRepository)=>
       async():Promise<object[]|null>=>{
        const data=await tutorRepository.CategoryWiseRevenue()
        return data
       }