import { Request, Response } from "express";
import { IDRequest } from "../../middlewares/ClientauthMiddleware";
import messageRepositoryImp from "../../../infra/repositories/chat/messageRepository";
import { messageModel } from "../../../infra/database/model/messageModel";
import { MessagesBychatId, Messagetouser, newMessage } from "../../../app/useCase/chat/messages";
import { CustomRequest } from "../../middlewares/authMiddleware";

const messageRepository = messageRepositoryImp(messageModel)

export const messageTotutor = async(req:IDRequest,res:Response)=>{

    try {
        const {content,chatid} = req.body
        console.log(content,chatid,'both got hrere');
        
        const userid = req.user.user._id

        const response = await newMessage(messageRepository)(userid,chatid,content)

        res.status(200).json(response)
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'}) 

    }
}

export const AllmessageBychatid = async(req:Request,res:Response)=>{
    try {
        const chatid = req.params.chatid
        console.log(chatid,'chatid is hrer');
        
        const response = await MessagesBychatId(messageRepository)(chatid)
        res.status(200).json(response)
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'}) 
    }
}

export const messagetouser = async(req:CustomRequest,res:Response)=>{
    try {
        const {content,chatid} = req.body
        console.log(content,chatid);
        
        const tutorid = req.tutor.tutor._id
        console.log(tutorid);
        
    
        const response = await Messagetouser(messageRepository)(tutorid,chatid,content)
        res.status(200).json(response)
    } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
    }
}