"use strict";
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
exports.tutorBlock = exports.getTutorsbyName = exports.getAllTutors = void 0;
const getTutors_1 = require("../../../app/useCase/admin/getTutors");
const tutorModel_1 = require("../../../infra/database/model/tutorModel");
const tutorRepository_1 = __importDefault(require("../../../infra/repositories/tutor/tutorRepository"));
const error_1 = require("../../../untils/error");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const adminModel_1 = require("../../../infra/database/model/adminModel");
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
