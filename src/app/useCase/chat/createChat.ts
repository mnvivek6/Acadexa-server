import { chatRepository } from "../../../infra/repositories/chat/chatRepository";

export const NewChat = (chatRepository:chatRepository)=>
    async(userid:string,tutorid:string)=>{
        const response = chatRepository.createChat(userid,tutorid)
        return response
    }
