import { Tutor } from "../../../domain/entities/tutor/tutorValidation";
import { userRepository } from "../../../infra/repositories/user/userRepository";

export const GetTutor =(userRepository:userRepository)=>
async(id:string|undefined)=>{
    const tutor = await userRepository.GetTutorById(id)
    return tutor
}