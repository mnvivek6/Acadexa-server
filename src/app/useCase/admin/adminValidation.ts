
import dotenv from 'dotenv'
import path from 'path'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { adminLoginType } from '../../../interface/controller/admin/adminLoginController'

dotenv.config({path:path.resolve(__dirname,'../.env')})

export const passwordHashing:Function =async(password:string):Promise<string>=> {
    
    const hashedPassword = await bcryptjs.hash(password,10)
    return  hashedPassword;
}

export const passwordCompare:Function = async(plainTextPassword:string,hashedPassword:string):Promise<boolean>=>{
    const passowrd:boolean = await bcryptjs.compare(plainTextPassword,hashedPassword)
    return passowrd
}

export  const createToken = (admin:adminLoginType):string=>{

    const secreteKey:string|undefined = 'AdMiNsEcReTkEy'
    if(!secreteKey){throw new Error('No secret key found')}

const token = jwt.sign({admin},secreteKey as string, {expiresIn:'1h'})
return token
}