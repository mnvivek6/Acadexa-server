import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from "path"
import { User } from "../../../domain/entities/user/userValidation"

dotenv.config({path:path.resolve(__dirname,'../.env')})

export const passwordHashing:Function=async(password:string):Promise<string>=>{
    const hashedPassword = await bcrypt.hash(password,10)
    return hashedPassword;
}
export const passwordCompare:Function = async(plainTextPassword:string,hashedPassword:string):Promise<boolean>=>{
    const password:boolean = await bcrypt.compare(plainTextPassword,hashedPassword)
    return password
}
export const createToken = (user: User): string => {
    // console.log(user,'inner side');
    
    const secreteKey: string | undefined = 'Studentsecretkey';
    // console.log(secreteKey,'generated success fully');
    

    if (!secreteKey) {
        throw new Error('JWT secret key is not defined');
    }


    const token = jwt.sign({user},secreteKey as string, {expiresIn:'1day'})
    console.log(token);
    return token
    
    
}