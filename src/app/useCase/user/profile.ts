import { User } from "../../../domain/entities/user/userValidation";
import { userDetails, userRepository } from "../../../infra/repositories/user/userRepository";


export const UserProfile = (userRepository:userRepository)=>
      

    async(id:string):Promise<User|null>=>{

        console.log('log from inside userPrfile');
       const user =  await userRepository.GetProfile(id)
       console.log(user);
       
    return user
    
}

export const editProfile = (userRepository:userRepository)=>
  async(id:string,userDetails:userDetails):Promise<User|null>=>{

    const newUser = await userRepository.EditProfile(id,userDetails)
    return   newUser;
  }