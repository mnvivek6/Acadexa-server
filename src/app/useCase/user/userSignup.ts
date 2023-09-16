import { User } from "../../../domain/entities/user/userValidation";
import { userRepository } from "../../../infra/repositories/user/userRepository";
import { AppError } from "../../../untils/error";
import { passwordHashing } from "./userValidationHelper";





export const signupUser = (userRepository:userRepository)=>{
   
    return async (user:User):Promise<User>=>{
        console.log(user,'usecase');
        
        const isUserExist = await userRepository.findOneUserByEmail(user.email);
        if (isUserExist) {
            throw new AppError('User already exists', 409);
        }
        console.log(isUserExist,'not exixt');
        
        
        const hashpassword = await passwordHashing(user?.password);
        const newUser = { ...user, password: hashpassword };
        
        console.log(newUser, 'new user created');
        
        const createdUser = await userRepository.createUser(newUser);
        console.log(createdUser, 'user created successfully');
        
        return createdUser;
    }
    
}