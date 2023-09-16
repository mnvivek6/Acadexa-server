import { TutorLoginType, tutorRepository } from "../../../infra/repositories/tutor/tutorRepository"
import { AppError } from "../../../untils/error"
import { createToken, passwordCompare } from "./tutorValidation"

type tutorReturnType ={
    token:string,
    status:string
}


export const loginTutor = (tutorRepository:tutorRepository)=>{

    return async(tutor:TutorLoginType):Promise<tutorReturnType>=>{

        const {email,password} = tutor

        const isTutorExist:TutorLoginType|null = await tutorRepository.findTutorByEmail(email)
       console.log(isTutorExist,"userExist");
     
       if(!isTutorExist){
          throw new AppError('user is not exist',400)
          
    }

    const ispasswordCorrect = await passwordCompare(password,isTutorExist.password)
    if (!ispasswordCorrect) {
        throw new AppError('incorrect password',401)
    }

    

    const tutorToken = await createToken(isTutorExist)
    const verifiedTutor = {
        token:tutorToken,
        status:'loign success'
    }
   
    console.log(verifiedTutor,'verified tutor');
    
    return verifiedTutor
}
}