import express from "express"
import { adminLogin } from "../controller/admin/adminLoginController"
import { BlockUser, getAllUsers } from "../controller/admin/getUsers"
import { UpdateProfile,  } from "../controller/admin/adminProfile"
import { adminAuthToken } from "../middlewares/authMiddleware"
import { addcategory, getcategory } from "../controller/admin/addcategory"

const adminRoute = express.Router()

adminRoute.post('/login', adminLogin)
adminRoute.get('/getusers',adminAuthToken, getAllUsers)
adminRoute.post('/updateProfile',adminAuthToken,UpdateProfile)
adminRoute.post('/blockuser',adminAuthToken,BlockUser)
adminRoute.post('/addcategory',adminAuthToken,addcategory)
adminRoute.get('/getcategory',adminAuthToken,getcategory)


export default adminRoute;