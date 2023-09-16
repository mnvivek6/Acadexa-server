
import dotenv from 'dotenv'
import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { adminLoginType } from '../../../interface/controller/admin/adminLoginController'

dotenv.config({path:path.resolve(__dirname,'../.env')})

export const passwordHashing:Function =async(password:string):Promise<string>=> {
    
    const hashedPassword = await bcrypt.hash(password,10)
    return  hashedPassword;
}

export const passwordCompare:Function = async(plainTextPassword:string,hashedPassword:string):Promise<boolean>=>{
    const passowrd:boolean = await bcrypt.compare(plainTextPassword,hashedPassword)
    return passowrd
}

export  const createToken = (admin:adminLoginType):string=>{

    const secreteKey:string|undefined = process.env.ADMIN_SECRET_KEY
    if(!secreteKey){throw new Error('No secret key found')}

const token = jwt.sign({admin},secreteKey as string, {expiresIn:'1h'})
return token
}