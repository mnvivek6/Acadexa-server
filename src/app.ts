import express, { Application,Request,Response,NextFunction, ErrorRequestHandler }  from "express";
import { Server } from "http";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import createHtttpError from "http-errors";
import connectDB from "./infra/database/dbConfig"
import userRoute from "./interface/routes/user";
import adminRoute from "./interface/routes/admin";
import tutorRoute from "./interface/routes/tutor";
import { Socket } from "socket.io";
import { newMessageReceived } from "./domain/entities/chat/message";
const app: Application = express()

app.use(express.json())
//Enable CORS for all routes
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

dotenv.config();
connectDB(process.env.MONGODB_CONNECTION_URL||'');

//setup routes
app.use('/',userRoute);
app.use('/admin',adminRoute);
app.use('/tutor',tutorRoute)


//page not found error handling
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.send(new createHtttpError.NotFound())
})
const errorHandler:ErrorRequestHandler=(error,req,res,next)=>{
    res.status(error.status || 500)
    res.send({
        status:res.status || 500,
        message:error.message
    }) 
}
app.use(errorHandler)


const PORT: number = Number(process.env.PORT) || 4000
const server: Server = app.listen(4000,()=>console.log(`server is running ${PORT}`))

const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:['http://localhost:3000',process.env.CLIENT_URL as string]
    }
})

io.on("connection",(socket:any)=>{
    socket.on("setup",(userid:string)=>{
        socket.join(userid)
        socket.emit("connected")
    })
    socket.on('join chat',(room:string)=>{
        socket.join(room)

    })
    socket.on('new message',(newMessageReceived:newMessageReceived)=>{

        let chat = newMessageReceived?.chat
        const sender = newMessageReceived?.user?newMessageReceived?.user:newMessageReceived?.tutor

        if (sender?._id === newMessageReceived?.chat?.user?._id) {
            socket.in(chat?.tutor?._id).emit("message recieved",newMessageReceived)
        }
        if (chat?._id === newMessageReceived?.chat?.tutor?._id) {
            socket.in(chat?.user?._id).emit('message recievd', newMessageReceived)
        }
        if (chat?._id === newMessageReceived?.user?._id) return
        socket.in(chat?.user?._id).emit("message recieved",newMessageReceived)

        socket.on("typing",(currentid:string)=>socket.to(currentid).emit("typing"))
        socket.on("stoptyping",(currentid:string)=>socket.to(currentid).emit("stoptyping"))

        if (chat?._id ===newMessageReceived?.tutor?._id) return
        socket.in(chat?.tutor?._id).emit('message recieved',newMessageReceived)
    })
})
