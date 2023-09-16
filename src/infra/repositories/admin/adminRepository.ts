
import { category } from "../../../domain/entities/tutor/category"
import { adminLoginType } from "../../../interface/controller/admin/adminLoginController"
import { MongoDBAdmin, adminModel } from "../../database/model/adminModel"
import { categoryModel } from "../../database/model/categoryModel"
import { courseModel } from "../../database/model/courseModel"

export type adminRepository = {
    findAdminbyEmail: (email: string) => Promise<adminLoginType | null>
    getAdminById: (Id: string) => {}
    updateProfileById:(id:string,adminDetails:object)=> Promise<object|null>
    Addcategory:(category:category)=>Promise<category>
    getcategory:()=>Promise<object[]>
    getCourse:()=>Promise<object[]>

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
    const getCourse = async():Promise<object[]>=>{
        const course = await courseModel.find()
        return  course
        }
    
    return { findAdminbyEmail, getAdminById , updateProfileById,Addcategory,getcategory,getCourse}
}

export default adminRepositoryImp