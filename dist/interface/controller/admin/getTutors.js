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
exports.decline = exports.verify = exports.tutorbyid = exports.unverifiedTutors = exports.tutorBlock = exports.getTutorsbyName = exports.getAllTutors = void 0;
const getTutors_1 = require("../../../app/useCase/admin/getTutors");
const tutorModel_1 = require("../../../infra/database/model/tutorModel");
const tutorRepository_1 = __importDefault(require("../../../infra/repositories/tutor/tutorRepository"));
const error_1 = require("../../../untils/error");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const adminModel_1 = require("../../../infra/database/model/adminModel");
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailValidator = __importStar(require("email-validator"));
const db = tutorModel_1.tutorModel;
const tutorRepository = (0, tutorRepository_1.default)(db);
const adminRepository = (0, adminRepository_1.default)(adminModel_1.adminModel);
const getAllTutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTutors = yield (0, getTutors_1.AllTuTors)(tutorRepository)();
        if (!allTutors) {
            throw new error_1.AppError("something went wrong ", 400);
        }
        console.log(allTutors, 'all tutors are here');
        res.json({ allTutors });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.getAllTutors = getAllTutors;
const getTutorsbyName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.value;
        const response = yield (0, getTutors_1.SearchTutor)(adminRepository)(searchQuery);
        console.log(response, 'daslghytirtetqwsd');
        res.status(200).json(response);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.getTutorsbyName = getTutorsbyName;
const tutorBlock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tutorid, action } = req.body;
        console.log(tutorid, 'tutor id is here');
        console.log(action, 'action is here ');
        if (!tutorid || !action)
            throw new error_1.AppError("somthing went wrong ", 500);
        const blockedTuto = yield (0, getTutors_1.blockedTutor)(adminRepository)(tutorid, action);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.tutorBlock = tutorBlock;
const unverifiedTutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('unverified tutors');
        const response = yield (0, getTutors_1.unverifiedtutors)(adminRepository)();
        console.log(response, 'response form backend');
        if (!response) {
            throw new error_1.AppError("something went wronggggg ", 400);
        }
        res.status(200).json(response);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.unverifiedTutors = unverifiedTutors;
const tutorbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorid = req.params.tutorid;
        console.log(tutorid);
        const response = yield (0, getTutors_1.gettutorbyid)(adminRepository)(tutorid);
        if (!response) {
            throw new error_1.AppError("something went wronggggg ", 400);
        }
        res.status(200).json(response);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.tutorbyid = tutorbyid;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorid = req.params.tutorid;
        const tutor = yield tutorModel_1.tutorModel.findOne({ _id: tutorid });
        const tutoremail = tutor === null || tutor === void 0 ? void 0 : tutor.email;
        const tutorname = tutor === null || tutor === void 0 ? void 0 : tutor.name;
        if (emailValidator.validate(tutoremail)) {
            ResponseMail(tutorname, tutoremail);
            verifydata(tutorid);
        }
        res.status(200).json({ message: 'Tutor verified successfully' });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.verify = verify;
const decline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutoremail = req.query.values;
        console.log(tutoremail, 'mail got here');
        const tutor = yield tutorModel_1.tutorModel.findOne({ email: tutoremail });
        const tutorname = tutor === null || tutor === void 0 ? void 0 : tutor.name;
        // console.log(tutorObject);
        console.log(tutorname);
        console.log(tutoremail);
        if (emailValidator.validate(tutoremail)) {
            console.log('rejection mail is here');
            RejectionMail(tutorname, tutoremail);
        }
        res.status(200).json({ message: "Declined Successfully" });
    }
    catch (error) {
    }
});
exports.decline = decline;
const ResponseMail = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log('sending mail');
        const mailOptions = {
            from: 'vivekmn04@gmail.com',
            to: email,
            subject: 'verification Email',
            html: `<h1>Hello ${name}, Your certificate has been verified by the Acadexa team. Click <a href="http://localhost:3000/tutor/login">here</a> to log in.</h1> `
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log(info);
    }
    catch (error) {
        // console.error('error sendign email:', error);/
    }
});
const RejectionMail = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(name, email);
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'vivekmn04@gmail.com',
                pass: 'gklfwccxjdvifomb',
            }
        });
        const mailOptions = {
            from: 'vivekmn04@gmail.com',
            to: email,
            subject: 'verification Email',
            html: `<h1>Hello ${name}, Your certificate has been denied by the Acadexa team.</h1>`
        };
        const info = yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        // console.error('error sendign email:', error);/
    }
});
const verifydata = (tutorid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateInfo = yield tutorModel_1.tutorModel.updateOne({ _id: tutorid }, { $set: { verify: true } });
    }
    catch (error) {
    }
});
