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
exports.searchCourseByname = exports.Courses = void 0;
const adminModel_1 = require("../../../infra/database/model/adminModel");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const course_1 = require("../../../app/useCase/admin/course");
const adminRepository = (0, adminRepository_1.default)(adminModel_1.adminModel);
const Courses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, course_1.courses)(adminRepository)();
        console.log(response, 'all courses is here');
        res.status(200).json(response);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.Courses = Courses;
const searchCourseByname = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sortCriteria = {};
        if (req.query.sort && req.query.sort === 'coursefee-1')
            sortCriteria = { coursefee: -1 };
        else if (req.query.sort && req.query.sort === 'coursefee1')
            sortCriteria = { coursefee: 1 };
        else if (req.query.sort && req.query.sort === 'duration-1')
            sortCriteria = { duration: -1 };
        else if (req.query.sort && req.query.sort === 'duration1')
            sortCriteria = { duration: 1 };
        else { }
        let searchQuery = req.query.value;
        console.log(searchQuery, 'qwertyuiop');
        const respone = yield (0, course_1.searchcourse)(adminRepository)(searchQuery, sortCriteria);
        console.log(respone, 'response are here');
        res.status(200).json(respone);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.searchCourseByname = searchCourseByname;
