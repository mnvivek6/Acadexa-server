import  { adminRepository } from "../../../infra/repositories/admin/adminRepository";


export const getAdminById =(adminRepository:adminRepository)=>{
return async(adminId:string):Promise<object|null>=>{
    const admin = adminRepository.getAdminById(adminId)
    if (!admin) {
         throw new Error("didn't get admin data");
        
    }
    return admin
}
 }

 export const UpdateAdminProfile = (adminRepository:adminRepository)=>{
    return async(adminId:string,adminDetails:object):Promise<object|null>=>{

        const admin :object|null = await adminRepository.updateProfileById(adminId,adminDetails)
        return admin
    }
 }



    