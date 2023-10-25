import { Message } from "../../../domain/entities/chat/message";
import  { messageRepository } from "../../../infra/repositories/chat/messageRepository";

export const newMessage = (messageRepository:messageRepository)=>
 async(userid:string,chatid:string,content:string):Promise<Message|undefined>=>{
    
    const response = await messageRepository.newMessage(userid,chatid,content)
    return response
}
export const MessagesBychatId =(messageRepository:messageRepository)=>



  async(chatid:string):Promise<Message[]|undefined>=>{
    console.log(chatid,"chat idddddddddddddd");
    
    const res = await messageRepository.getMessegbyChatid(chatid)
    return res
  }

  export const Messagetouser = (messageRepository:messageRepository)=>
  async(tutorid:string,chatid:string,content:string):Promise<Message|undefined>=>{
    const response = await messageRepository.newMessgetouser(tutorid,chatid,content)
    return response;
  }