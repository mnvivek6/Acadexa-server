import { Course } from "../../../domain/entities/tutor/course";
import { adminRepository } from "../../../infra/repositories/admin/adminRepository";

export const courses= (adminRepository:adminRepository)=>{

    return async():Promise<Course[]|undefined>=>{
        const course = await adminRepository.getCourse()
        return course
    }
}
export const searchcourse = (adminRepository:adminRepository)=>
      async(searchQuery:string,sortCriteria:object):Promise<Course[]|undefined>=>{
        const respone = await adminRepository.searchCourse(searchQuery,sortCriteria)
        return  respone;
      }
