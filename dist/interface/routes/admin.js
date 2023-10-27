"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminLoginController_1 = require("../controller/admin/adminLoginController");
const getUsers_1 = require("../controller/admin/getUsers");
const adminProfile_1 = require("../controller/admin/adminProfile");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const addcategory_1 = require("../controller/admin/addcategory");
const getTutors_1 = require("../controller/admin/getTutors");
const getcourse_1 = require("../controller/admin/getcourse");
const adminRoute = express_1.default.Router();
adminRoute.post('/login', adminLoginController_1.adminLogin);
adminRoute.get('/getusers', authMiddleware_1.adminAuthToken, getUsers_1.getAllUsers);
adminRoute.post('/updateProfile', authMiddleware_1.adminAuthToken, adminProfile_1.UpdateProfile);
adminRoute.post('/blockuser', authMiddleware_1.adminAuthToken, getUsers_1.BlockUser);
adminRoute.post('/addcategory', authMiddleware_1.adminAuthToken, addcategory_1.addcategory);
adminRoute.get('/getcategory', authMiddleware_1.adminAuthToken, addcategory_1.getcategory);
adminRoute.get('/alltutuors', authMiddleware_1.adminAuthToken, getTutors_1.getAllTutors);
adminRoute.post('/editcourse/:categoryid', authMiddleware_1.adminAuthToken, addcategory_1.editCategory);
adminRoute.get('/getcourses', authMiddleware_1.adminAuthToken, getcourse_1.Courses);
adminRoute.get('/searchcoursebyname', authMiddleware_1.adminAuthToken, getcourse_1.searchCourseByname);
adminRoute.get('/searchuserbyname', authMiddleware_1.adminAuthToken, getUsers_1.SearchUserByName);
adminRoute.get('/searchtutorbyname', authMiddleware_1.adminAuthToken, getTutors_1.getTutorsbyName);
adminRoute.post('/blocktutor', authMiddleware_1.adminAuthToken, getTutors_1.tutorBlock);
adminRoute.get('/unverifiedtutors', authMiddleware_1.adminAuthToken, getTutors_1.unverifiedTutors);
adminRoute.get('/gettutorbyid/:tutorid', authMiddleware_1.adminAuthToken, getTutors_1.tutorbyid);
adminRoute.post('/verify/:tutorid', authMiddleware_1.adminAuthToken, getTutors_1.verify);
adminRoute.get('/decline', authMiddleware_1.adminAuthToken, getTutors_1.decline);
exports.default = adminRoute;
