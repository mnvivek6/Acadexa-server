import { Request, Response } from "express";
import { chatModel } from "../../../infra/database/model/chatModel";
import chatRepositoryImp from "../../../infra/repositories/chat/chatRepository";
import { IDRequest } from "../../middlewares/ClientauthMiddleware";
import { NewChat } from "../../../app/useCase/chat/createChat";
import { CustomRequest } from "../../middlewares/authMiddleware";

const chatRepository = chatRepositoryImp(chatModel)

export const createChat = async(req:IDRequest,res:Response)=>{

    try {
        const userid = req.user.user._id
        console.log(userid,'userid is here');
        
        const tutorid = req.params.tutorid
        console.log(tutorid,'tutor id is hrere');
        

        if (!userid||!tutorid) {
            res.status(400).json({message:"something went wrong"});
        }
        const response = await NewChat(chatRepository)(userid,tutorid)
        console.log(response,'response here');
        
        res.status(200).json(response)
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'}) 
    }
}

export const TutorTousers= async(req:CustomRequest,res:Response)=>{
    try {
        
        const tutorid = req.tutor.tutor._id
        console.log('tutorid:',tutorid);
        
        const userid = req.params.id
        console.log('userid:',userid);
        
        if (!userid||!tutorid) {
            res.status(400).json({message:"something went wrong"});
        }
        const response = await NewChat(chatRepository)(userid,tutorid)
        res.status(200).json(response)
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'}) 
    }
}
  