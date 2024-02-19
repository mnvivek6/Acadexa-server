import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/userModel";
import userRepositoryImp from "../../../infra/repositories/user/userRepository";
import { User } from "../../../domain/entities/user/userValidation";
import { AppError } from "../../../untils/error";
import { signupUser } from "../../../app/useCase/user/userSignup";
import nodemailer from 'nodemailer'
import * as emailValidator from 'email-validator'


const db = userModel
const userRepository = userRepositoryImp(db)

export const userSignup = async (req: Request, res: Response) => {

    try {

        const user: User = req.body
        // console.log(user);
        
        if (!user.name || !user.email || !user.password || /^\s*$/.test(user.name) ||
            /^\s*$/.test(user.email) ||
            /^\s*$/.test(user.password)) {
            throw new AppError('all field are required', 400)
        }
        if (user.password.length < 6) {
            throw new AppError("password must be at least 6 digits", 400);
        }
        const createUser: User = await signupUser(userRepository)(user)
        
        
        if (!createUser) {
            res.status(500).json({ message: 'something went wrong' })
        }

        console.log(user.email);
        
        if (emailValidator.validate(user.email)) {
           
            
            sendverifyEmail(req.body.name, req.body.email, createUser._id);
        } else {
            console.log(`${user.email}is not a valid email address.`);

        }
        res.status(200).json({ message: 'user created successfully' })
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: error.message || 'something went wrong' })
    }
}

const sendverifyEmail = async (name: string, email: string, user_id: string) => {
    
    
    try {
         
         
        const transporter = nodemailer.createTransport({
          
            
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'vivekmn04@gmail.com',
                pass: 'cmkb mgrg rhin fhck',
            }
        })
          
          
        const mailOptions = {
            from: 'vivekmn04@gmail.com',
            to: email,
            subject: 'verification Email',
            html: `<h1>Hello ${name},please click <a href="https://untitledlegacy.online/verifymail/${user_id}">here</a> to verify your email.</p>`
        }
        const info = await transporter.sendMail(mailOptions)
console.log(info);


    } catch (error) {
        console.error('error sendign email:', error);

    }

}
export const verifyEmail = async (req: Request, res: Response) => {
    try {
    //    console.log('hi');
       
        const userId = req.params.id
        
        // console.log(userId);
        
        const updateInfo = await userModel.updateOne({ _id: userId}, { $set: { isMailvarified: true } })
        if (updateInfo) {
            return res.json({messsage:'Email verification successful',updateInfo})
        }

    } catch (error) {
    //    console.error(error);
       return res.status(500).json({error:'internal server error'})
       
       
    }    
}