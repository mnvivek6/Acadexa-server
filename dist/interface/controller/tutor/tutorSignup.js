"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTutorMail = exports.TutorSignup = void 0;
const tutorModel_1 = require("../../../infra/database/model/tutorModel");
const tutorRepository_1 = __importDefault(require("../../../infra/repositories/tutor/tutorRepository"));
const error_1 = require("../../../untils/error");
const tutorSignup_1 = require("../../../app/useCase/tutor/tutorSignup");
const emailValidator = __importStar(require("email-validator"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const db = tutorModel_1.tutorModel;
const tutorRepository = (0, tutorRepository_1.default)(db);
const TutorSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutor = req.body;
        console.log(tutor.name);
        if (!tutor.name || !tutor.email || !tutor.password || /^\s*$/.test(tutor.name) || /^\s*$/.test(tutor.email) || /^\s*$/.test(tutor.password)) {
            throw new error_1.AppError("All field are required", 400);
        }
        if (tutor.password.length < 6) {
            throw new error_1.AppError("Password must be at least 6 letters", 400);
        }
        const createdTutor = yield (0, tutorSignup_1.signupTutor)(tutorRepository)(tutor);
        console.log(createdTutor, "created tutor");
        if (!createdTutor) {
            res.status(500).json({ message: 'something went wrong' });
        }
        if (emailValidator.validate(tutor.email)) {
            sendverifyEmail(req.body.name, req.body.email, createdTutor._id);
        }
        else {
            console.log(`${tutor.email}is not a valid email address.`);
        }
        res.status(200).json({ message: ' Tutor created successfully' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || ' something went wrong' });
    }
});
exports.TutorSignup = TutorSignup;
const sendverifyEmail = (name, email, tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'vivekmn04@gmail.com',
                pass: 'gklfwccxjdvifomb',
            }
        });
        console.log(email, "asimmm");
        const mailOptions = {
            from: 'vivekmn04@gmail.com',
            to: email,
            subject: 'verification Email',
            html: `<h1>Hello ${name},please click <a href="http://localhost:3000/tutor/verifyEmail/${tutorId}">here</a> to verify your email.</p>`
        };
        const info = yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error('error sending email:', error);
    }
});
const verifyTutorMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('hihihiih');
        const tutorId = req.params.id;
        console.log(tutorId);
        const updateInfo = yield tutorModel_1.tutorModel.updateOne({ _id: tutorId }, { $set: { isMailVerified: true } });
        if (updateInfo) {
            return res.json({ message: 'Email verification successfull', updateInfo });
        }
        else {
            return res.status(404).json({ error: 'user not found' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'internal server error' });
    }
});
exports.verifyTutorMail = verifyTutorMail;
