import express from 'express'
import { TutorSignup, verifyTutorMail } from '../controller/tutor/tutorSignup'
import { tutorLogin } from '../controller/tutor/tutorLogin'
import { tutorProfile } from '../controller/tutor/setupProfile'
import { profile } from '../controller/tutor/profile'
import { tutorAuthToken } from '../middlewares/authMiddleware'
import {AllCourses, CreateCourse} from'../controller/tutor/addCourse'
import { getcategory } from '../controller/admin/addcategory'
import { GetCourse } from '../../app/useCase/tutor/addCourse'
const tutorRoute = express.Router()

tutorRoute.post('/signup',TutorSignup)
tutorRoute.post('/verifyEmail/:id',verifyTutorMail)
tutorRoute.post('/login',tutorLogin)
tutorRoute.get('/profile',tutorAuthToken,profile)
tutorRoute.post('/setupProfile',tutorAuthToken,tutorProfile)
tutorRoute.post('/addcourse',tutorAuthToken,CreateCourse)
tutorRoute.get('/getcategory',tutorAuthToken,getcategory)
tutorRoute.get('/getcourse',tutorAuthToken,AllCourses)




export default tutorRoute