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
exports.TotalRevenue = exports.PurchasedUsers = exports.SigleCourseById = exports.AllCourses = exports.CreateCourse = void 0;
const tutorModel_1 = require("../../../infra/database/model/tutorModel");
const tutorRepository_1 = __importDefault(require("../../../infra/repositories/tutor/tutorRepository"));
const addCourse_1 = require("../../../app/useCase/tutor/addCourse");
const categoryModel_1 = require("../../../infra/database/model/categoryModel");
const db = tutorModel_1.tutorModel;
const tutorRepository = (0, tutorRepository_1.default)(db);
const CreateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('hi');
        const id = req.tutor.tutor._id;
        console.log(id, 'user id ');
        console.log(req.body, 'from body ');
        const { title, description, coursefee, duration, level, selectedCategory, fileUrl } = req.body;
        const category = yield categoryModel_1.categoryModel.findOne({ name: selectedCategory });
        console.log(category === null || category === void 0 ? void 0 : category._id, 'find category');
        const courseData = {
            title: title,
            description: description,
            level: level,
            coursefee: coursefee,
            duration: duration,
            tutor: id,
            category: category === null || category === void 0 ? void 0 : category._id,
            image: fileUrl
        };
        const createdCourse = yield (0, addCourse_1.AddCourse)(tutorRepository)(courseData);
        res.status(200).json({ message: 'Course created successfully', course: createdCourse });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.CreateCourse = CreateCourse;
const AllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.tutor.tutor._id;
        console.log(id, 'tutor id is hereeeeeeeeeeee');
        const allCourses = yield (0, addCourse_1.GetCourse)(tutorRepository)(id);
        if (allCourses) {
            res.status(200).json({ message: allCourses });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || ' something went wrong' });
    }
});
exports.AllCourses = AllCourses;
const SigleCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('log from sigle course by id');
    try {
        const id = req.params.id;
        const singleCourse = yield (0, addCourse_1.SigleCourse)(tutorRepository)(id);
        if (singleCourse) {
            res.status(200).json({ singleCourse });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || ' something went wrong' });
    }
});
exports.SigleCourseById = SigleCourseById;
const PurchasedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseid = req.params.id;
        console.log(courseid, 'course id is here');
        const response = yield (0, addCourse_1.purchasedusers)(tutorRepository)(courseid);
        console.log(response, 'response herer');
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || ' something went wrong' });
    }
});
exports.PurchasedUsers = PurchasedUsers;
const TotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorid = req.tutor.tutor._id;
        const response = yield (0, addCourse_1.totalrevenue)(tutorRepository)(tutorid);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || ' something went wrong' });
    }
});
exports.TotalRevenue = TotalRevenue;
