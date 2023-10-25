import { Message } from "../../../domain/entities/chat/message"
import { messageModel, mongoDBMessage } from "../../database/model/messageModel"


export type messageRepository ={
    
    newMessage:(userid:string,chatid:string,content:string)=>Promise<Message|undefined>
    getMessegbyChatid:(chatid:string)=>Promise<Message[]|undefined>
    newMessgetouser:(tutorid:string,chatid:string,content:string)=>Promise<Message|undefined>
}

const messageRepositoryImp = (messageModel:mongoDBMessage):messageRepository=>{


    const newMessage = async(userid:string,chatid:string,content:string):Promise<Message|undefined>=>{
        try {
            
            const  messageData ={
                user:userid,
                chat:chatid,
                content:content
            }

            let Message = await messageModel.create(messageData)
             
            Message = await Message.populate('chat')
            Message = await Message.populate('tutor')
            Message = await Message.populate('user')
            Message = await Message.populate('chat.tutor')
            Message = await Message.populate('chat.user')

            return Message
        } catch (error) {
            
        }
    }
    const getMessegbyChatid = async(chatid:string):Promise<Message[]|undefined>=>{
        try {
            const messages = await messageModel.find({chat:chatid}).populate('user').populate('tutor').populate('chat')
            return messages
        } catch (error) {
            console.log(error)
            
        }
    }
    const  newMessgetouser = async(tutorid:string,chatid:string,content:string):Promise<Message|undefined>=>{
        try {
            const messageData ={
                tutor:tutorid,
                chat:chatid,
                content:content
            }
            let Message = await messageModel.create(messageData)
             
            Message = await Message.populate('chat')
            Message = await Message.populate('tutor')
            Message = await Message.populate('user')
            Message = await Message.populate('chat.tutor')
            Message = await Message.populate('chat.user')

            return Message

        } catch (error) {
            
        }
    }
    return{newMessage,getMessegbyChatid,newMessgetouser}
}

export default messageRepositoryImp