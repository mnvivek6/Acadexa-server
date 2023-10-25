import { userRepository } from "../../../infra/repositories/user/userRepository";



export const Searchcoursefiltersort = (userRepository:userRepository)=>

async(filters:string,sortCritirea:object)=>{
   // console.log(filters,'filteres in the usecase');
   
   return await userRepository.CourseSearchSortFilter(filters,sortCritirea)

}