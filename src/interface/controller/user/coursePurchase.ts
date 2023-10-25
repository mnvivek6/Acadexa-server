import { Request, Response } from "express";
import { userModel } from "../../../infra/database/model/userModel";
import userRepositoryImp from "../../../infra/repositories/user/userRepository";
import { IDRequest } from "../../middlewares/ClientauthMiddleware";
import { PaymentUpdate } from "../../../app/useCase/user/payment";
import { Payment } from "../../../domain/entities/tutor/payment";
import { ObjectId } from "mongoose";
import { coursee } from "./home";


const db = userModel
const userRepository = userRepositoryImp(db)

export const Paymentdetails = async(req:IDRequest,res:Response)=>{
    
  try {
    
      const id = req.user.user._id
      const courseid = req.body.courseid
      const amount = req.body.Amount
      
     console.log(id ,courseid,amount,'user id is here');
     
     const purChaseData = {
        user: req.user.user._id,
        course: req.body.courseid,
        amount:req.body.Amount,
        tutor:req.body.tutorid
     }
   
   const response = await PaymentUpdate(userRepository)(purChaseData)
  //  console.log(response,'response form backend');
  } catch (error) {
   
    
  }
  


   
    

}