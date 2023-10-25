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
exports.findCoursebycategory = exports.CourseByIdTUtor = exports.SingleTutor = exports.CategoryByid = exports.sigelCourse = exports.coursee = exports.categories = void 0;
const userModel_1 = require("../../../infra/database/model/userModel");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const getCategory_1 = require("../../../app/useCase/user/getCategory");
const getCourse_1 = require("../../../app/useCase/user/getCourse");
const getTutor_1 = require("../../../app/useCase/user/getTutor");
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const categories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const Allcategory = yield (0, getCategory_1.Category)(userRepository)();
        if (Allcategory) {
            res.status(200).json({ Allcategory });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.categories = categories;
const coursee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allcourse = yield (0, getCourse_1.course)(userRepository)();
        if (allcourse) {
            res.status(200).json({ allcourse });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.coursee = coursee;
const sigelCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const singleCourse = yield (0, getCourse_1.CourseById)(userRepository)(id);
        if (singleCourse) {
            res.status(200).json({ singleCourse });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.sigelCourse = sigelCourse;
const CategoryByid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield (0, getCategory_1.categoryById)(userRepository)(id);
        if (response) {
            res.status(200).json({ response });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.CategoryByid = CategoryByid;
const SingleTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.tutor;
        // console.log(id,'tutor id is here');
        const response = yield (0, getTutor_1.GetTutor)(userRepository)(id);
        // console.log(response,'tutor by id is here');
        if (response) {
            res.status(200).json({ response });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.SingleTutor = SingleTutor;
const CourseByIdTUtor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const response = yield (0, getCourse_1.courseByTUtor)(userRepository)(id);
        // console.log(response,'course by tutor id');
        if (response) {
            res.status(200).json({ response });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.CourseByIdTUtor = CourseByIdTUtor;
const findCoursebycategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryid = req.params.id;
        // console.log(categoryid,'category id got here');
        const response = yield (0, getCourse_1.findCoursebyCategory)(userRepository)(categoryid);
        // console.log(response,'respnse got ere');
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.findCoursebycategory = findCoursebycategory;
