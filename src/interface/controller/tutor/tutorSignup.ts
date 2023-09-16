import { Request, Response } from "express";
import { tutorModel } from "../../../infra/database/model/tutorModel";
import tutorRepositoryImp from "../../../infra/repositories/tutor/tutorRepository";
import { Tutor } from "../../../domain/entities/tutor/tutorValidation";
import { AppError } from "../../../untils/error";
import { signupTutor } from "../../../app/useCase/tutor/tutorSignup";
import * as emailValidator from 'email-validator'
import nodemailer from 'nodemailer'

const db = tutorModel
const tutorRepository = tutorRepositoryImp(db)

export const TutorSignup = async ( req:Request,res:Response)=>{

    try {
        const tutor:Tutor = req.body
        console.log(tutor.name);
        
        if (!tutor.name|| !tutor.email || !tutor.password||/^\s*$/.test(tutor.name)||/^\s*$/.test(tutor.email)||/^\s*$/.test(tutor.password) ) {
            throw new AppError("All field are required",400);
        }
        if (tutor.password.length<6) {
            throw new AppError("Password must be at least 6 letters",400);       
        }
        const createdTutor:Tutor= await signupTutor(tutorRepository)(tutor)
           console.log(createdTutor,"created tutor");
           
        if (!createdTutor) {
            
            res.status(500).json({message:'something went wrong'})
            
        }
        if (emailValidator.validate(tutor.email)) {
            sendverifyEmail(req.body.name,req.body.email,createdTutor._id)
        }else{
            console.log(`${tutor.email}is not a valid email address.`);
            
        }
        res.status(200).json({message:' Tutor created successfully'})
    } catch (error:any) {
        res.status(error.statusCode||500).json({message:error.message ||' something went wrong'})
    }
}

const sendverifyEmail = async ( name:string, email:string , tutorId:string)=>{
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
          console.log(email,"asimmm");
          
        const mailOptions = {
            from: 'vivekmn04@gmail.com',
            to: email,
            subject: 'verification Email',
            html: `<h1>Hello ${name},please click <a href="http://localhost:3000/tutor/verifyEmail/${tutorId}">here</a> to verify your email.</p>`
        }
        const info = await transporter.sendMail(mailOptions)

    } catch (error) {
        console.error('error sending email:' ,error);
        
    }

   
}
export const verifyTutorMail = async ( req:Request,res:Response)=>{

    try {
        console.log('hihihiih');
        
        const tutorId = req.params.id
        console.log(tutorId);
        

        const updateInfo = await tutorModel.updateOne({_id:tutorId},{$set:{isMailVerified:true}})
        if (updateInfo) {
            return res.json({message:'Email verification successfull',updateInfo})
        }else{
            return res.status(404).json({error:'user not found'})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:'internal server error'})
    }
}