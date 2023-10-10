import { Tutor } from "../../../domain/entities/tutor/tutorValidation"
import { adminRepository } from "../../../infra/repositories/admin/adminRepository"
import { tutorRepository } from "../../../infra/repositories/tutor/tutorRepository"


export const AllTuTors =(tutorRepository:tutorRepository)=>

    async():Promise<object[]>=>{
        const tutors = await tutorRepository.getAllTutors()
        return tutors
    }
export const SearchTutor = (adminRepository:adminRepository)=>

    async(searchQuery:string):Promise<Tutor[]|undefined>=>{
        const result = await adminRepository.searchTutor(searchQuery)
        return result
    }
export const blockedTutor = (adminRepository:adminRepository)=>
   
    async(tutorid:string,action:string):Promise<boolean|undefined>=>{
        const result=await  adminRepository.UpdateIsblocktutor(tutorid , action);
        return result
    }
