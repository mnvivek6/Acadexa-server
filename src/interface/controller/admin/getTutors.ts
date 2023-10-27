import { Request, Response } from "express";
import { AllTuTors, SearchTutor, blockedTutor, gettutorbyid, unverifiedtutors } from "../../../app/useCase/admin/getTutors";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { AppError } from "../../../untils/error";
import adminRepositoryImp from "../../../infra/repositories/admin/adminRepository";
import { adminModel } from "../../../infra/database/model/adminModel";
import nodemailer from 'nodemailer'
import * as emailValidator from 'email-validator'
const db = tutorModel

const tutorRepository = tutorRepositoryImp(db)
const adminRepository = adminRepositoryImp(adminModel)

export const getAllTutors = async(req:Request,res:Response)=>{

    try {
        const allTutors = await AllTuTors(tutorRepository)()
        if (!allTutors) {
            throw new AppError("something went wrong ",400)
        }
        console.log(allTutors,'all tutors are here');
        
       res.json({allTutors})
         
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}

export const getTutorsbyName = async(req:Request,res:Response)=>{
    try {
        const searchQuery = req.query.value as string
        const response = await SearchTutor(adminRepository)(searchQuery)
        console.log(response,'daslghytirtetqwsd');
        res.status(200).json(response)
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}
export const tutorBlock = async(req:Request,res:Response)=>{
    try {
        const {tutorid,action} = req.body
        console.log(tutorid,'tutor id is here');
        console.log(action,'action is here ');
        
        
        if (!tutorid||!action)  throw new AppError("somthing went wrong ",500);
        const blockedTuto = await blockedTutor(adminRepository)(tutorid,action)
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}
export const unverifiedTutors = async(req:Request, res:Response)=>{
    try {
        console.log('unverified tutors');
        
        const response = await unverifiedtutors(adminRepository)()
        console.log(response,'response form backend');
        
        if (!response) {
            throw new AppError("something went wronggggg ",400)
        }
      res.status(200).json(response)
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}

export const tutorbyid = async(req:Request,res:Response)=>{
    try {
        
        const tutorid = req.params.tutorid
          console.log(tutorid);
          
        const response = await gettutorbyid(adminRepository)(tutorid)
        if (!response) {
            throw new AppError("something went wronggggg ",400)
        }
        res.status(200).json(response)
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}

export const verify = async(req:Request,res:Response)=>{

    try {
        const tutorid = req.params.tutorid
        const tutor = await tutorModel.findOne({_id:tutorid})
        const tutoremail = tutor?.email as string
        const tutorname = tutor?.name as string

        
        
        
        if (emailValidator.validate(tutoremail)) {
            ResponseMail(tutorname,tutoremail)
            verifydata(tutorid)
        }
        res.status(200).json({message:'Tutor verified successfully'})
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message||"something went wrong"})
    }
}

interface tutordata {
    name:string,
    email:string,
}
export const decline = async(req:Request,res:Response)=>{
    try {
        
        
        const tutoremail = req.query.values as string
        console.log(tutoremail,'mail got here');
        const tutor = await tutorModel.findOne({email:tutoremail})
        const tutorname = tutor?.name as string
        
        
        // console.log(tutorObject);
       
        console.log(tutorname);
        console.log(tutoremail);
        
        if (emailValidator.validate(tutoremail as string)) {
            console.log('rejection mail is here');
            
            RejectionMail(tutorname,tutoremail) 
        }
        res.status(200).json({message:"Declined Successfully"})
    } catch (error) {
        
    }
}

const ResponseMail = async (name: string, email: string,) => {
    
    try {

        
        
              
        const transporter = nodemailer.createTransport({
          
            
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'vivekmn04@gmail.com',
                pass: 'gklfwccxjdvifomb',
            }
        })
          console.log('sending mail');
          
         
        const mailOptions = {
            from: 'vivekmn04@gmail.com',
            to: email,
            subject: 'verification Email',
            html: `<h1>Hello ${name}, Your certificate has been verified by the Acadexa team. Click <a href="http://localhost:3000/tutor/login">here</a> to log in.</h1> `
        }
        const info = await transporter.sendMail(mailOptions)
console.log(info);


    } catch (error) {
        // console.error('error sendign email:', error);/

    }

}
const RejectionMail = async (name: string, email: string,) => {
    
    try {
              console.log(name,email);
              
        const transporter = nodemailer.createTransport({
          
            
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'vivekmn04@gmail.com',
                pass: 'gklfwccxjdvifomb',
            }
        })
          
         
        const mailOptions = {
            from: 'vivekmn04@gmail.com',
            to: email,
            subject: 'verification Email',
            html: `<h1>Hello ${name}, Your certificate has been denied by the Acadexa team.</h1>`
        }
        const info = await transporter.sendMail(mailOptions)
        
        


    } catch (error) {
        // console.error('error sendign email:', error);/

    }

}
const verifydata = async (tutorid:string )=>{
    try {
        
        const updateInfo = await tutorModel.updateOne({_id:tutorid},{$set:{verify:true}})
       
    } catch (error) {
        
    }
}