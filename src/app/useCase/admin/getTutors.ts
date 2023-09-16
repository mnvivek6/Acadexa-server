import  { tutorRepository  } from "../../../infra/repositories/tutor/tutorRepository"

export const AllTutors =(tutorRepository:tutorRepository)=>

    async():Promise<object[]|null>=>{
        const tutors = await tutorRepository.getAllTutors()
        return tutors
    }
