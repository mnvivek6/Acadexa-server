import { AllTutors } from "../../../app/useCase/admin/getTutors";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import  tutorRepositoryImp, { tutorRepository  } from "../../../infra/repositories/tutor/tutorRepository"
import { AppError } from "../../../untils/error";

const db = tutorModel

const tutorRepository = tutorRepositoryImp(db)

export const getAllTutors = async(req:Response,res:Response)=>{

    const allTutors = await AllTutors(tutorRepository)()
    if (!allTutors) {
        throw new AppError("something went wrong ",400)
    }
    
}