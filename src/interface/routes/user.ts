import express from "express"
import { userSignup, verifyEmail } from "../controller/user/userSignupController"
import { userLogin } from "../controller/user/userLoginController"




const userRoute = express.Router()

userRoute.post('/signup',userSignup)
userRoute.post('/login',userLogin)
userRoute.post('/verifyEmail/:id',verifyEmail)



export default userRoute