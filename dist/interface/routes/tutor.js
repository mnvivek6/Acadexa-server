"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tutorSignup_1 = require("../controller/tutor/tutorSignup");
const tutorLogin_1 = require("../controller/tutor/tutorLogin");
const setupProfile_1 = require("../controller/tutor/setupProfile");
const profile_1 = require("../controller/tutor/profile");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const tutorRoute = express_1.default.Router();
tutorRoute.post('/signup', tutorSignup_1.TutorSignup);
tutorRoute.post('/verifyEmail/:id', tutorSignup_1.verifyTutorMail);
tutorRoute.post('/login', tutorLogin_1.tutorLogin);
tutorRoute.get('/profile', authMiddleware_1.tutorAuthToken, profile_1.profile);
tutorRoute.post('/setupProfile', authMiddleware_1.tutorAuthToken, setupProfile_1.tutorProfile);
exports.default = tutorRoute;
