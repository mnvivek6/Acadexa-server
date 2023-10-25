import { category } from "../../../domain/entities/tutor/category";
import { Course } from "../../../domain/entities/tutor/course";
import { Tutor } from "../../../domain/entities/tutor/tutorValidation";
import { AppError } from "../../../untils/error";
import { categoryModel } from "../../database/model/categoryModel";
import { courseModel } from "../../database/model/courseModel";
import { mongoDBTutor, tutorModel } from "../../database/model/tutorModel";



export type TutorLoginType={
    _id:string
    name:string
    email:string
    phone:number
    password:string
    image:string
    isBlocked:boolean
    isMailVerified:boolean
    aboutme:string
   
}
export type tutorRepository ={

    createTutor:(tutor:Tutor)=>Promise<Tutor>
    findTutorByEmail:(email:string)=>Promise<TutorLoginType|null>
    setUpProfile:(Id:string,tutorDetails:object)=>Promise<object|null>
    getProfile:(id:string)=>Promise<object|null>
    getAllTutors:()=>Promise<object[]>
    addCourse:(Course:object)=>Promise<Course>
    getAllCourses:(id:string)=>Promise<object[]>
    GetSigleCourse:(id:string)=>Promise<Course>
    createClass:(id:string,classDetails:object)=>Promise<Course>

   
}

const tutorRepositoryImp =(TutorModel:mongoDBTutor):tutorRepository=>{

    const createTutor = async(tutor:Tutor):Promise<Tutor>=>{
        let newTutor = await TutorModel.create(tutor)
        return newTutor
    }

    const findTutorByEmail = async(email:string):Promise<TutorLoginType|null>=>{

        const ExistingTutor = await TutorModel.findOne({email:email})
        console.log(ExistingTutor,'find tutor by email and passing tutor');
        
        return ExistingTutor
    }
    interface TutorDetails {
        qualification?: string; // Use "?" to indicate that these properties are optional
        experience?: string;
        aboutme?:string;
      }
    const setUpProfile = async(id:string, tutorDetails:TutorDetails):Promise<object|null>=>{
        console.log(id,'tutorjo id');
        
        console.log(tutorDetails);
        const {qualification ,experience,aboutme} = tutorDetails
        const tutor:object|null = await tutorModel.findByIdAndUpdate({_id:id},{$set:{qualification:qualification,experience:experience,aboutme:aboutme}})
        console.log(tutor,'updated tutor');
        
        return tutor
    }
    const getProfile = async(id:string):Promise<object|null>=>{
        const tutor:object|null = await tutorModel.findById({_id:id})
        return tutor
    }
    const getAllTutors = async():Promise<object[]>=>{
        const allTutors:object[] = await tutorModel.find({},{password:0})
        if(!allTutors) throw new AppError('somthing went wrong when block the user',500)
        return  allTutors;
    }
    const addCourse = async(course:object):Promise<Course>=>{
        const addedCourse = await courseModel.create(course)
        if (!addedCourse) throw new AppError("something went wrong while blocking user",500);

        return addedCourse
    }
    const getAllCourses = async(id:string):Promise<object[]>=>{
        const allCourses:object[] = await courseModel.find({tutor:id})
        if(!allCourses){throw new Error ('Something Went Wrong')}
        console.log(allCourses,'get all courses ');
        return allCourses
    }
    const GetSigleCourse= async(id:string):Promise<Course>=>{
        const course:Course|null = await courseModel.findById({_id:id})
        if ( !course ) throw new AppError ("No Course Found",500)
        return course
    }
    const createClass = async (id: string, ClassDetails: object): Promise<Course> => {
        try {
            console.log(ClassDetails,'class details are here');
            
          const updatedCourse = await courseModel.findByIdAndUpdate(id,{ $push: { classes: ClassDetails, }, }, { new: true,upsert: true, });
      
          return updatedCourse;
        } catch (error) {
          // Handle any errors here
          console.error(error);
          throw error;
        }
    };
 
    return {createTutor,findTutorByEmail,setUpProfile,getProfile,getAllTutors,addCourse,getAllCourses,GetSigleCourse,createClass}
}
export default tutorRepositoryImp