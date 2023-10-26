import express from "express"
import { userSignup, verifyEmail } from "../controller/user/userSignupController"
import { userLogin } from "../controller/user/userLoginController"
import { CategoryByid, CourseByIdTUtor, SingleTutor, categories, coursee, findCoursebycategory, sigelCourse } from "../controller/user/home"
import { userAuthToken } from "../middlewares/ClientauthMiddleware"
import { Chekingpurchased, EditedProfile, profile, purchasedcourse } from "../controller/user/profile"
import { Paymentdetails } from "../controller/user/coursePurchase"
import { SearchCourseFilterSort } from "../controller/course/searchCourse"
import userRepositoryImp from "../../infra/repositories/user/userRepository"
import { createChat } from "../controller/chat/chat"
import { AllmessageBychatid, messageTotutor } from "../controller/chat/sendMessage"
import { MessagesBychatId } from "../../app/useCase/chat/messages"




const userRoute = express.Router()

userRoute.post('/signup',userSignup)
userRoute.post('/login',userLogin)
userRoute.post('/verifyEmail/:id',verifyEmail)
userRoute.get('/getCategory',categories)
userRoute.get('/allcourses',userAuthToken,coursee)
userRoute.get('/singleCourse/:id',userAuthToken,sigelCourse)
userRoute.get('/profile', userAuthToken , profile)
userRoute.get('/purchaseCourse/:id',userAuthToken,sigelCourse)
userRoute.get('/singlecategory/:id',userAuthToken,CategoryByid)
userRoute.get('/getTutor/:tutor',userAuthToken,SingleTutor)
userRoute.get('/coursebytutor',userAuthToken,CourseByIdTUtor)
userRoute.post('/editprofile',userAuthToken,EditedProfile)
userRoute.post('/paymentData',userAuthToken,Paymentdetails)
userRoute.get('/purchasedcourse',userAuthToken,purchasedcourse)
userRoute.get('/checkingpurchased/:courseid',userAuthToken,Chekingpurchased)
userRoute.get('/getcoursesbysearch',userAuthToken,SearchCourseFilterSort)
userRoute.get('/searchsortfilter',userAuthToken,SearchCourseFilterSort)
userRoute.get('/coursebycategory/:id',userAuthToken,findCoursebycategory)
userRoute.post('/createchat/:tutorid',userAuthToken,createChat)
userRoute.post('/sendingtotutor',userAuthToken,messageTotutor)
userRoute.get('/allchatsbychatid/:chatid',AllmessageBychatid)



export default userRoute