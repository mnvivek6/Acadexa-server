
import { Tutor } from "../../../domain/entities/tutor/tutorValidation";
import { tutorRepository } from "../../../infra/repositories/tutor/tutorRepository";
import { AppError } from "../../../untils/error";
import { passwordHashing } from "../user/userValidationHelper";



export const signupTutor = (tutorRepository:tutorRepository)=>{

    return async(tutor:Tutor):Promise<Tutor>=>{
       console.log(tutor,'from tutor signup');
       console.log('hi');
       
        const isExist = await tutorRepository.findTutorByEmail(tutor.email)
        console.log(isExist,'checking tutor');
        
        if (isExist) {
            throw new AppError("Tutor aleardy exist",409);
            
        }

        const hashedPassword = await passwordHashing(tutor?.password)
        const newTutor = {...tutor,password:hashedPassword}
        const createdTutor = await tutorRepository.createTutor(newTutor)

        return createdTutor
    }

}