import { NextFunction, Request, Response} from "express"

import { GetPublicKeyOrSecret,  Secret, } from "jsonwebtoken"
import jwt from 'jsonwebtoken'
import { User } from "../../domain/entities/user/userValidation"

require('dotenv').config()

const userSecretekey:string = process.env.USER_SECRET_KEY as string
export interface IDRequest extends Request {
    user?: any
  }
const verifyToken = (authHeader: string|string[]|undefined,secretekey:Secret | GetPublicKeyOrSecret,req:Request,res:Response ,next: any)=>{

    try {
        
        if (!authHeader || !secretekey) {
        
            return res.status(401).json({success:false,message:'Not Authenticated!',auth:false})
        }
    
        interface MyRequest extends Request {
            user?: any; // Assuming `tutor` can hold any value
          }
          // Verify the JWT token
         const token:string = req.headers.user as string
         console.log(token,'sdfasdfsfdsfdfasdfsfsdfsdfsfsdf');
         
         const splitedToken:string = token.split(' ')[1] 
         const tokenWithoutQuotes = splitedToken.replace(/"/g, '');
          console.log(tokenWithoutQuotes,'splited token is here');
          
          jwt.verify(tokenWithoutQuotes,secretekey , async(err: any | null, decode: any) => {
            if (err) {
                console.log(err);
                
              return res.status(403).json({ error: 'Invalid token' });
            }
            if (decode) {
               
                
                (req as MyRequest).user = decode
                next();
                        
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
   console.log(authHeader,'auth header from user auth side');
   
    verifyToken(authHeader, userSecretekey, req, res, next);
  };