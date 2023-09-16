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
const adminRoute = express_1.default.Router();
adminRoute.post('/login', adminLoginController_1.adminLogin);
adminRoute.get('/getusers', authMiddleware_1.adminAuthToken, getUsers_1.getAllUsers);
adminRoute.post('/updateProfile', authMiddleware_1.adminAuthToken, adminProfile_1.UpdateProfile);
adminRoute.post('/blockuser', authMiddleware_1.adminAuthToken, getUsers_1.BlockUser);
exports.default = adminRoute;
