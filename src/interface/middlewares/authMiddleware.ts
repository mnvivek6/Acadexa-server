import { NextFunction, Request, Response} from "express"

import { GetPublicKeyOrSecret,  Secret, } from "jsonwebtoken"
import jwt from 'jsonwebtoken'

require('dotenv').config()

const userSecretekey:string = 'Studentsecretkey' as string
const adminSecretekey:string = 'AdMiNsEcReTkEy' as string
const tutorSecretekey:string = 'TuToRsEcReTkEy'as string


export interface CustomRequest extends Request {
  tutor?: any
}

const verifyToken = (authHeader: string|string[]|undefined,secretekey:Secret | GetPublicKeyOrSecret,req:Request,res:Response ,next: any)=>{

    try {
        
        if (!authHeader || !secretekey) {
        
            return res.status(401).json({success:false,message:'Not Authenticated!',auth:false})
        }
    
        interface MyRequest extends Request {
            tutor?: any; // Assuming `tutor` can hold any value
          }
          // Verify the JWT token
         const token:string = req.headers.tutor as string
        //  console.log(token);
        //  
         const splitedToken:string = token.split(' ')[1] 
          
          jwt.verify(splitedToken,secretekey , async(err: any | null, decode: any) => {
            if (err) {
              return res.status(403).json({ error: 'Invalid token' });
            }
            if (decode) {
              // console.log(decode,'decoded user is here');
              
              
                (req as MyRequest).tutor = decode;
                next();
                
              // Assuming you want to assign the decoded value to req.tutor            
            }
          });
        
    } catch (error) {
        res.status(401).json({
            success : false,
            message:"not authenticated",
            auth:false
        })
    }
   
}
export const userAuthToken = (req: Request, res:Response, next: NextFunction) => {
  const authHeader: string | string[] | undefined = req.headers.user;
//  console.log(authHeader,'auth header from user auth side');
 
  verifyToken(authHeader, userSecretekey, req, res, next);
};

 export const adminAuthToken =(req:CustomRequest,res:Response, next:NextFunction)=>{
    const authHeader:any|string[]|undefined=req.headers
      // console.log(authHeader,'auth headers from admin side');
      
    verifyToken(authHeader ,adminSecretekey  , req, res,next )
}
export const tutorAuthToken =(req:CustomRequest,res:Response,next:NextFunction)=>{
    const authHeader:any|string[]|undefined=req.headers.tutor
    verifyToken(authHeader,tutorSecretekey,req,res,next)

}




