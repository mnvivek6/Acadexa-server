import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import path from "path"
import { Tutor } from "../../../domain/entities/tutor/tutorValidation"


dotenv.config({path:path.resolve(__dirname,'../.env')})

export const passwordHashing:Function = async(password:string):Promise<string>=>{
    const hashedPassword = await bcrypt.hash(password,10)
    return  hashedPassword;
}

export const passwordCompare:Function = async(plainTextPassword:string,hashedPassword:string):Promise<boolean>=>{
    const passowrd:boolean = await bcrypt.compare(plainTextPassword,hashedPassword)
    return passowrd
}

export const createToken = (tutor:object):string =>{

    const secreteKey:string|undefined = 'TuToRsEcReTkEy'
    if(!secreteKey){throw new Error('no secret key found')}

    const token = jwt.sign({tutor},secreteKey as string,{expiresIn:'1day'})

    return token
}

