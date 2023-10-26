import express from "express"
import { adminLogin } from "../controller/admin/adminLoginController"
import { BlockUser, SearchUserByName, getAllUsers } from "../controller/admin/getUsers"
import { UpdateProfile,  } from "../controller/admin/adminProfile"
import { adminAuthToken } from "../middlewares/authMiddleware"
import { addcategory, editCategory, getcategory } from "../controller/admin/addcategory"
import { getAllTutors, getTutorsbyName, tutorBlock, tutorbyid, unverifiedTutors } from "../controller/admin/getTutors"
import { Courses, searchCourseByname } from "../controller/admin/getcourse"

const adminRoute = express.Router()

adminRoute.post('/login', adminLogin)
adminRoute.get('/getusers',adminAuthToken, getAllUsers)
adminRoute.post('/updateProfile',adminAuthToken,UpdateProfile)
adminRoute.post('/blockuser',adminAuthToken,BlockUser)
adminRoute.post('/addcategory',adminAuthToken,addcategory)
adminRoute.get('/getcategory',adminAuthToken,getcategory)
adminRoute.get('/alltutuors',adminAuthToken,getAllTutors)
adminRoute.post('/editcourse/:categoryid',adminAuthToken,editCategory)
adminRoute.get('/getcourses',adminAuthToken,Courses)
adminRoute.get('/searchcoursebyname',adminAuthToken,searchCourseByname)
adminRoute.get('/searchuserbyname',adminAuthToken,SearchUserByName)
adminRoute.get('/searchtutorbyname',adminAuthToken,getTutorsbyName)
adminRoute.post('/blocktutor',adminAuthToken,tutorBlock)
adminRoute.get('/unverifiedtutors',adminAuthToken,unverifiedTutors)
adminRoute.get('/gettutorbyid/:tutorid',adminAuthToken,tutorbyid)


export default adminRoute;