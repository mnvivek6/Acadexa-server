import { Chat } from "../../../domain/entities/chat/chat"
import { mongoDBChat } from "../../database/model/chatModel"

export type chatRepository ={

    createChat :(userid:string,tutorid:string)=>Promise<Chat|undefined>
    getAllchatByuser:(userid:string)=>Promise<Chat|undefined> 
    getAllchatbyTutor:(tutorid:string)=>Promise<Chat|undefined>
}

const chatRepositoryImp = (chatModel:mongoDBChat):chatRepository =>{

    const createChat = async(userid:any,tutorid:any):Promise<Chat|undefined>=>{
        try {
            const ischat = await chatModel.find({$and:[{tutor:tutorid} ,{user:userid}]})
            console.log(ischat,'findind chat data');
            
            if(ischat.length>0){
                return ischat[0]
                }
            else{
                const chatdata:any={
                    chatname:'chat',
                    user:userid,
                    tutor:tutorid
                }
                const newchat = await chatModel.create(chatdata)
                console.log(newchat,"created chat with user and tutor id")
                const createdChat:any= await chatModel.findOne({_id:newchat._id}).populate('user','-password').populate('tutor','-password')
                return createdChat
            }
   
        } catch (error) {   
           console.log(error);
            
        }
    }
    const getAllchatByuser = async(userid:string):Promise<Chat|undefined>=>{
        try {
             const chat:any = await chatModel.find({user:userid}).populate('user')
             return chat
        } catch (error) {
            
        }
    }
    const getAllchatbyTutor = async(tutorid:string):Promise<Chat|undefined>=>{
        try {
            const chats:any = await chatModel.find({tutor:tutorid}).populate('tutor')
            return chats
        } catch (error) {
            
        }
    }
    return {createChat,getAllchatByuser,getAllchatbyTutor}
}

export default chatRepositoryImp