import { tutorRepository } from "../../../infra/repositories/tutor/tutorRepository";

export const SetupProfile = (tutorRepository:tutorRepository)=>{
    return async(tutorId: string, tutorDetails:object):Promise<object|null>=>{
        
        const tutor:object|null = await tutorRepository.setUpProfile(tutorId,tutorDetails)
        return  tutor;
    }
}

export const ViewProfile = (tutorRepository:tutorRepository)=>
     async(tutorId:string):Promise<object|null>=>{
     const tutor = await tutorRepository.getProfile(tutorId)
     return  tutor
    }

