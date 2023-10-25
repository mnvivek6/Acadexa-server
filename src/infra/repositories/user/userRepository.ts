import { MongoDBUser, userModel} from "../../database/model/userModel";
import { User } from "../../../domain/entities/user/userValidation";
import { AppError } from "../../../untils/error";
import { category } from "../../../domain/entities/tutor/category";
import { categoryModel } from "../../database/model/categoryModel";
import { Course } from "../../../domain/entities/tutor/course";
import { courseModel } from "../../database/model/courseModel";
import { Tutor } from "../../../domain/entities/tutor/tutorValidation";
import { tutorModel } from "../../database/model/tutorModel";
import { Payment } from "../../../domain/entities/tutor/payment";
import { paymentModel } from "../../database/model/paymentModel";
// import { filter } from "../../../interface/controller/course/searchCourse";

export interface userDetails {
    name:string
    email:string
    phone:string
    fileUrl:string
}
 
export type userRepository={

    createUser:(user:User)=> Promise<User>;
    findOneUserByEmail:(email:string)=>Promise<User | null>;
    getAllUsers:()=>Promise<object[] | null>;
    getUserById:(id:string)=>Promise<object|null>
    updateUserById:(id:string,user:object)=>Promise<object|null>
    UpdateIsblock:(userid:string,action:string)=>Promise<boolean|undefined>
    AllCategory:()=>Promise<object[]|undefined>
    AllCourse:()=>Promise<Course[]>
    GetCourseById:(id:string)=>Promise<Course|null>
    GetcategoryById:(id:string)=>Promise<category|null>
    GetProfile:(id:string)=>Promise<User|null>
    GetTutorById:(id:string|undefined)=>Promise<Tutor|null>
    findBlockedUser:(email:string)=>Promise<boolean>
    CheckMailverification:(email:string)=>Promise<boolean>
    GetCourseByTutor:(id:string)=>Promise<Course[]>
    EditProfile:(id:string,userDetails:userDetails)=>Promise<User|null>
    CoursePurchase:(purchaseDetails:Payment)=>Promise<Payment>
    PurchaseCourse:(id:string)=>Promise<Object|undefined>
    CourseSearchSortFilter:(filters:string,sortCritirea:object)=>Promise<Course[]|null>
    findCourseByuserandcourse:(courseid:string,userid:string)=>Promise<Payment|null>
    findCourseByCategory(categoryid:string):Promise<Course[]|undefined>
}
const userRepositoryImp = (UserModel: MongoDBUser): userRepository => {

    const createUser = async(user:User):Promise<User>=>{
        // console.log(user,'repository'); 
        let newUser = await UserModel.create(user)
        return newUser
    }
    const findOneUserByEmail= async (email:string):Promise<User|null>=>{

        const user:User|null = await UserModel.findOne({email})
        return user
    }
    const  getAllUsers= async():Promise<object[]>=>{
        const allUsers:object[]|null = await UserModel.find({},{password:0})
        if(!allUsers) throw new AppError('somthing went wrong when block the user',500)
        return allUsers
    }
    const getUserById = async(id:string):Promise<object|null>=>{
        const user:object|null = await userModel.findById(id)
        if (!user) {
            throw new AppError("user is not found",202)
        }
        return user
    }
    const updateUserById = async(id:string,userDetails:object):Promise<object|null>=>{
        const updatedUser :object|null = await userModel.findByIdAndUpdate(id,userDetails)
        return updatedUser
    }
    const UpdateIsblock = async (userid:string,action:string):Promise<boolean|undefined>=>{
        let isBlocked :boolean|undefined
        if(action === 'block') isBlocked =true
        if(action === 'unblock') isBlocked =false
        const Blockeduser = await userModel.findByIdAndUpdate(userid,{isBlocked},{new:true})
        if (!Blockeduser) throw new AppError("something went wrong while blocking user",500);
        return isBlocked
    }
    const AllCategory = async ():Promise<object[]|undefined>=>{
        const categories = await categoryModel.find()
            return categories
    }
    const AllCourse = async():Promise<Course[]>=>{
       const courses = await courseModel.find()
       return courses
    }
    const GetCourseById = async(id:string):Promise<Course|null>=>{
        const course:Course|null = await courseModel.findById({_id:id}).populate('tutor')
        return course
    }
    const GetTutorById = async(id:string|undefined):Promise<Tutor|null>=>{
        const tutor:Tutor | null =await tutorModel.findById({ _id: id })
        return tutor
    }
    const GetcategoryById = async(id:string):Promise<category|null>=>{
        const category= await categoryModel.findById({_id:id})
        return category
    }
    const GetProfile = async(id:string):Promise<User|null>=>{
        const profile:User|null = await userModel.findById({_id:id})
        // console.log(profile,'user profile is inside');
        return profile
    }
    const findBlockedUser = async(email:string):Promise<boolean>=>{
        const user = await userModel.findOne({email,isBlocked:true})
        if (user) {
            return true
        }else{
            return false
        }
    }
    const  CheckMailverification = async(email:string):Promise<boolean>=>{
        const user:any= userModel.findOne({email:email})
        if (user.isMailvarified==true) {
            return true
        }else{
            return false
        }
    }
    const GetCourseByTutor = async(id:string):Promise<Course[]>=>{
        const response = await courseModel.find({tutor:id})
        return response
    }
    const EditProfile = async(id:string,userDetails:userDetails):Promise<User|null>=>{
        const {name,email,phone,fileUrl}  = userDetails
        const response :User|null = await userModel.findByIdAndUpdate({_id:id},{$set:{name:name,email:email,phone:phone,image:fileUrl}})
        return response
    }
    const CoursePurchase = async(purchaseCourse:Payment):Promise<Payment>=>{
        // const {user,course,tutor,amount} = purchaseCourse
        const response:Payment = await paymentModel.create(purchaseCourse)
        return response
    }
    const PurchaseCourse = async (id: string): Promise<Object > => {
        const purchasedcourse = await paymentModel.find({ user: id }).populate('course')
        if(!purchasedcourse)throw new AppError('write error',404)
        return purchasedcourse
      }
    const CourseSearchSortFilter = async(filters:string,sortCritirea:any):Promise<Course[]|null>=>{
        console.log(filters,'search query is here in backend repository');
        
        const response:Course[] = await courseModel.find({title:{$regex:filters,$options:'i'}}).sort(sortCritirea)
        // console.log(response,'response is here in repositories');
        
        return response 
    }  
    const findCourseByuserandcourse = async(courseid:string,userid:string):Promise<Payment|null>=>{
        const response:Payment|null = await paymentModel.findOne({course:courseid,user:userid})
        // console.log(response,'response here in the repository');
        
        return response
    }
    const findCourseByCategory = async(categoryid:string):Promise<Course[]|undefined>=>{
        const response = await courseModel.find({category:categoryid})
        return response
    }
    return{findCourseByCategory,createUser,findOneUserByEmail,getAllUsers,getUserById
         ,updateUserById,UpdateIsblock,AllCategory,AllCourse,GetCourseById,GetProfile,
         findBlockedUser,CheckMailverification,GetcategoryById,GetTutorById,GetCourseByTutor,
         EditProfile,CoursePurchase,PurchaseCourse,CourseSearchSortFilter,findCourseByuserandcourse}
}
export default  userRepositoryImp;
