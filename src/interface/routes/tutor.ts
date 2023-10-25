import express from 'express'
import { TutorSignup, verifyTutorMail } from '../controller/tutor/tutorSignup'
import { tutorLogin } from '../controller/tutor/tutorLogin'
import { tutorProfile } from '../controller/tutor/setupProfile'
import { TutorVerification, profile } from '../controller/tutor/profile'
import { tutorAuthToken } from '../middlewares/authMiddleware'
import {AllCourses, CreateCourse, PurchasedUsers, SigleCourseById, TotalRevenue} from'../controller/tutor/addCourse'
import { getcategory } from '../controller/admin/addcategory'
import { newClass } from '../controller/tutor/addClass'
import { categories } from '../controller/tutor/getCategory'
import { TutorTousers } from '../controller/chat/chat'
import { AllmessageBychatid, messageTotutor, messagetouser } from '../controller/chat/sendMessage'
import userRoute from './user'

const tutorRoute = express.Router()

tutorRoute.post('/signup',TutorSignup)
tutorRoute.post('/verifyEmail/:id',verifyTutorMail)
tutorRoute.post('/login',tutorLogin)
tutorRoute.post('/verifytutor/:tutorid',TutorVerification)
tutorRoute.get('/profile',tutorAuthToken,profile)
tutorRoute.post('/setupProfile',tutorAuthToken,tutorProfile)
tutorRoute.post('/addcourse',tutorAuthToken,CreateCourse)
tutorRoute.get('/getcategory',tutorAuthToken,getcategory)
tutorRoute.get('/getcourse',tutorAuthToken,AllCourses)
tutorRoute.get('/sigleCourse/:id',tutorAuthToken,SigleCourseById)
tutorRoute.post('/addclass/:id',tutorAuthToken,newClass)
tutorRoute.get('/getallcategories',tutorAuthToken,categories)
tutorRoute.get('/purchasedcourse/:id',tutorAuthToken,PurchasedUsers)
tutorRoute.post('/createChatwithuser/:id',tutorAuthToken,TutorTousers)
tutorRoute.get('/allchatsbychatid/:chatid',tutorAuthToken,AllmessageBychatid)
tutorRoute.post('/sendigtouser',tutorAuthToken,messagetouser)
tutorRoute.get('/totalrevenue',tutorAuthToken,TotalRevenue)




export default tutorRoute