import { MongoDBUser, userModel} from "../../database/model/userModel";
import { User } from "../../../domain/entities/user/userValidation";
import { userLoginType } from "../../../interface/controller/user/userLoginController";
import { AppError } from "../../../untils/error";

 
export type userRepository={

    createUser:(user:User)=> Promise<User>;
    findOneUserByEmail:(email:string)=>Promise<userLoginType | null>;
    getAllUsers:()=>Promise<object[] | null>;
    getUserById:(id:string)=>Promise<object|null>
    updateUserById:(id:string,user:object)=>Promise<object|null>
    UpdateIsblock:(userid:string,action:string)=>Promise<boolean|undefined>

}


const userRepositoryImp = (UserModel: MongoDBUser): userRepository => {

    const createUser = async(user:User):Promise<User>=>{
        console.log(user,'repository'); 
        let newUser = await UserModel.create(user)
        return newUser
    }
    const findOneUserByEmail= async (email:string):Promise<userLoginType|null>=>{

        const user:userLoginType|null = await UserModel.findOne({email})
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
    return{createUser,findOneUserByEmail,getAllUsers,getUserById ,updateUserById,UpdateIsblock}
}
export default  userRepositoryImp;









