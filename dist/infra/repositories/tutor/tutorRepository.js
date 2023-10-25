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
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../../untils/error");
const categoryModel_1 = require("../../database/model/categoryModel");
const courseModel_1 = require("../../database/model/courseModel");
const paymentModel_1 = require("../../database/model/paymentModel");
const tutorModel_1 = require("../../database/model/tutorModel");
const tutorRepositoryImp = (TutorModel) => {
    const createTutor = (tutor) => __awaiter(void 0, void 0, void 0, function* () {
        let newTutor = yield TutorModel.create(tutor);
        return newTutor;
    });
    const findTutorByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const ExistingTutor = yield TutorModel.findOne({ email: email });
        console.log(ExistingTutor, 'find tutor by email and passing tutor');
        return ExistingTutor;
    });
    const setUpProfile = (id, tutorDetails) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(id, 'tutorjo id');
        console.log(tutorDetails);
        const { qualification, experience, aboutme } = tutorDetails;
        const tutor = yield tutorModel_1.tutorModel.findByIdAndUpdate({ _id: id }, { $set: { qualification: qualification, experience: experience, aboutme: aboutme } });
        console.log(tutor, 'updated tutor');
        return tutor;
    });
    const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const tutor = yield tutorModel_1.tutorModel.findById({ _id: id });
        return tutor;
    });
    const getAllTutors = () => __awaiter(void 0, void 0, void 0, function* () {
        const allTutors = yield tutorModel_1.tutorModel.find({}, { password: 0 });
        if (!allTutors)
            throw new error_1.AppError('somthing went wrong when block the user', 500);
        return allTutors;
    });
    const addCourse = (course) => __awaiter(void 0, void 0, void 0, function* () {
        const addedCourse = yield courseModel_1.courseModel.create(course);
        if (!addedCourse)
            throw new error_1.AppError("something went wrong while blocking user", 500);
        return addedCourse;
    });
    const getAllCourses = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const allCourses = yield courseModel_1.courseModel.find({ tutor: id });
        if (!allCourses) {
            throw new Error('Something Went Wrong');
        }
        console.log(allCourses, 'get all courses ');
        return allCourses;
    });
    const GetSigleCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseModel_1.courseModel.findById({ _id: id });
        if (!course)
            throw new error_1.AppError("No Course Found", 500);
        return course;
    });
    const createClass = (id, ClassDetails) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(ClassDetails, 'class details are here');
            const updatedCourse = yield courseModel_1.courseModel.findByIdAndUpdate(id, { $push: { classes: ClassDetails, }, }, { new: true, upsert: true, });
            return updatedCourse;
        }
        catch (error) {
            // Handle any errors here
            console.error(error);
            throw error;
        }
    });
    const purchasedTutors = (courseid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const purchasedusers = yield paymentModel_1.paymentModel.find({ course: courseid }).populate('user').populate('course');
            console.log(purchasedusers, 'purchased users is here');
            return purchasedusers;
        }
        catch (error) {
            throw error;
        }
    });
    const TutorVerification = (verificationData, tutorid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedTutor = yield tutorModel_1.tutorModel.findByIdAndUpdate(tutorid, { $set: verificationData }, { new: true });
            return updatedTutor;
        }
        catch (error) {
            throw error;
        }
    });
    const TotalRevenue = (tutorid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const paymentDetails = yield paymentModel_1.paymentModel.find({ tutor: tutorid });
            return paymentDetails;
        }
        catch (error) {
            throw error;
        }
    });
    const CategoryWiseRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel_1.courseModel.find({}).populate('category');
            const categories = yield categoryModel_1.categoryModel.find({});
            return [courses, categories];
        }
        catch (error) {
            throw error;
        }
    });
    return { CategoryWiseRevenue, TotalRevenue, TutorVerification, purchasedTutors,
        createTutor, findTutorByEmail, setUpProfile, getProfile, getAllTutors,
        addCourse, getAllCourses, GetSigleCourse, createClass };
};
exports.default = tutorRepositoryImp;
