
import { category } from "../../../domain/entities/tutor/category"
import { Course } from "../../../domain/entities/tutor/course"
import { Tutor } from "../../../domain/entities/tutor/tutorValidation"
import { User } from "../../../domain/entities/user/userValidation"
import { adminLoginType } from "../../../interface/controller/admin/adminLoginController"
import { AppError } from "../../../untils/error"
import { MongoDBAdmin, adminModel } from "../../database/model/adminModel"
import { categoryModel } from "../../database/model/categoryModel"
import { courseModel } from "../../database/model/courseModel"
import { tutorModel } from "../../database/model/tutorModel"
import { userModel } from "../../database/model/userModel"

export type adminRepository = {
    findAdminbyEmail: (email: string) => Promise<adminLoginType | null>
    getAdminById: (Id: string) => {}
    updateProfileById:(id:string,adminDetails:object)=> Promise<object|null>
    Addcategory:(category:category)=>Promise<category>
    getcategory:()=>Promise<object[]>
    getCourse:()=>Promise<Course[]|undefined>
    getTutors:()=>Promise<object[]>
    editCategory:(id:string,categoryDetails:object)=>Promise<category|null>
    searchCourse:(searchQuery:string,sortCriteria:object)=>Promise<Course[]|undefined>
    searchUser:(searchQuery:string)=>Promise<User[]|undefined>
    searchTutor:(searchQuery:string)=>Promise<Tutor[]|undefined>
    UpdateIsblocktutor:(tutorid:string, action:string)=>Promise<boolean|undefined>
}

const adminRepositoryImp = (AdminModel: MongoDBAdmin): adminRepository => {
    const findAdminbyEmail = async (email: string): Promise<adminLoginType | null> => {
        const admindetails = await AdminModel.find()
        const admin: adminLoginType | null = await AdminModel.findOne({ email: admindetails.map((value) => value.email) })
        return admin
    }
    const getAdminById = async (adminId: string): Promise<any> => {
        try {
            const admin = await AdminModel.findById(adminId)

            if (!admin) {
                return null
            } else {
                return admin;
            }

        } catch (error: any) {
            throw error

        }

    }
    const updateProfileById = async(id:string,adminDetails:object):Promise<object|null>=>{

        const admin: object|null = await adminModel.findByIdAndUpdate(id,adminDetails,{new:true})
        return admin
    }

    const Addcategory = async(category:category):Promise<category>=>{
        const newCategory = await categoryModel.create(category)
        return newCategory
    }
    const getcategory = async():Promise<object[]>=>{
        const categories = await categoryModel.find()
        return categories
    }
    const getCourse = async():Promise<Course[]|undefined>=>{
        const course = await courseModel.find()
        return  course
        }
    const getTutors = async():Promise<object[]>=>{
        const tutors = await tutorModel.find()
        return tutors
    }    
    const editCategory = async(id:string,categoryDetails:object):Promise<category|null>=>{
        const category = await categoryModel.findByIdAndUpdate(id,categoryDetails,{new:true})
        return category
    }
    const searchCourse = async (searchQuery: string, sortCriteria: object): Promise<Course[] | undefined> => {
        try {
          const courses = await courseModel.find( { title: { $regex: searchQuery, $options: 'i' } },{ password: 0 });
          return courses;
        } catch (error) {
          console.error('Error in searchCourse:', error);
          throw error; // Rethrow the error to handle it at a higher level
        }
    };
    const searchUser = async (searchQuery:string):Promise<User[]|undefined>=>{
        try {
            const users = await userModel.find({ name: { $regex: searchQuery, $options: 'i' } },{ password: 0 }); 
              return users
        } catch (error) {
            console.error('Error in searchCourse:', error);
            throw error; // Rethrow the error to handle it at a higher level
        }
    }
    const searchTutor = async(searchQuery:string):Promise<Tutor[]|undefined>=>{
        try {
            const tutor = await tutorModel.find({name:{ $regex: searchQuery, $options: 'i' } },{ password: 0 })
            return tutor
        } catch (error) {
            throw error;
        }
    }
    const UpdateIsblocktutor = async (tutorid:string,action:string):Promise<boolean|undefined>=>{
        console.log(tutorid,action,'tutor id and action is hrein backend');
        
        let isBlocked :boolean|undefined
        if(action === 'block') isBlocked =true
        if(action === 'unblock') isBlocked =false
        const Blockedtutor = await tutorModel.findByIdAndUpdate(tutorid,{isBlocked},{new:true})
        if (!Blockedtutor) throw new AppError("something went wrong while blocking user",500);
        console.log(isBlocked,'dfsdfsf');
        
        return isBlocked
    }
    return {UpdateIsblocktutor,searchTutor,searchUser, findAdminbyEmail, getAdminById , updateProfileById,Addcategory,getcategory,getCourse,getTutors,editCategory,searchCourse}
}

export default adminRepositoryImp