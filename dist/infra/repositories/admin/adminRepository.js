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
const adminModel_1 = require("../../database/model/adminModel");
const categoryModel_1 = require("../../database/model/categoryModel");
const courseModel_1 = require("../../database/model/courseModel");
const tutorModel_1 = require("../../database/model/tutorModel");
const userModel_1 = require("../../database/model/userModel");
const adminRepositoryImp = (AdminModel) => {
    const findAdminbyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const admindetails = yield AdminModel.find();
        const admin = yield AdminModel.findOne({ email: admindetails.map((value) => value.email) });
        return admin;
    });
    const getAdminById = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield AdminModel.findById(adminId);
            if (!admin) {
                return null;
            }
            else {
                return admin;
            }
        }
        catch (error) {
            throw error;
        }
    });
    const updateProfileById = (id, adminDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield adminModel_1.adminModel.findByIdAndUpdate(id, adminDetails, { new: true });
        return admin;
    });
    const Addcategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = yield categoryModel_1.categoryModel.create(category);
        return newCategory;
    });
    const getcategory = () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield categoryModel_1.categoryModel.find();
        return categories;
    });
    const getCourse = () => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseModel_1.courseModel.find();
        return course;
    });
    const getTutors = () => __awaiter(void 0, void 0, void 0, function* () {
        const tutors = yield tutorModel_1.tutorModel.find();
        return tutors;
    });
    const editCategory = (id, categoryDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoryModel_1.categoryModel.findByIdAndUpdate(id, categoryDetails, { new: true });
        return category;
    });
    const searchCourse = (searchQuery, sortCriteria) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel_1.courseModel.find({ title: { $regex: searchQuery, $options: 'i' } }, { password: 0 });
            return courses;
        }
        catch (error) {
            console.error('Error in searchCourse:', error);
            throw error; // Rethrow the error to handle it at a higher level
        }
    });
    const searchUser = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.userModel.find({ name: { $regex: searchQuery, $options: 'i' } }, { password: 0 });
            return users;
        }
        catch (error) {
            console.error('Error in searchCourse:', error);
            throw error; // Rethrow the error to handle it at a higher level
        }
    });
    const searchTutor = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tutor = yield tutorModel_1.tutorModel.find({ name: { $regex: searchQuery, $options: 'i' } }, { password: 0 });
            return tutor;
        }
        catch (error) {
            throw error;
        }
    });
    const UpdateIsblocktutor = (tutorid, action) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(tutorid, action, 'tutor id and action is hrein backend');
        let isBlocked;
        if (action === 'block')
            isBlocked = true;
        if (action === 'unblock')
            isBlocked = false;
        const Blockedtutor = yield tutorModel_1.tutorModel.findByIdAndUpdate(tutorid, { isBlocked }, { new: true });
        if (!Blockedtutor)
            throw new error_1.AppError("something went wrong while blocking user", 500);
        console.log(isBlocked, 'dfsdfsf');
        return isBlocked;
    });
    return { UpdateIsblocktutor, searchTutor, searchUser, findAdminbyEmail, getAdminById, updateProfileById, Addcategory, getcategory, getCourse, getTutors, editCategory, searchCourse };
};
exports.default = adminRepositoryImp;
