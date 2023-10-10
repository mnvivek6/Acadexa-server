import { tutorRepository } from "../../../infra/repositories/tutor/tutorRepository";

export const Addclass = (tutorRepository:tutorRepository)=>

    async(id:string,classDetails:object):Promise<object|null>=>{

        const createdClass:object|null = tutorRepository.createClass(id,classDetails)

        return createdClass
    }

