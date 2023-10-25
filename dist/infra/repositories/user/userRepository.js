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
const userModel_1 = require("../../database/model/userModel");
const error_1 = require("../../../untils/error");
const categoryModel_1 = require("../../database/model/categoryModel");
const courseModel_1 = require("../../database/model/courseModel");
const tutorModel_1 = require("../../database/model/tutorModel");
const paymentModel_1 = require("../../database/model/paymentModel");
const userRepositoryImp = (UserModel) => {
    const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(user,'repository'); 
        let newUser = yield UserModel.create(user);
        return newUser;
    });
    const findOneUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserModel.findOne({ email });
        return user;
    });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield UserModel.find({}, { password: 0 });
        if (!allUsers)
            throw new error_1.AppError('somthing went wrong when block the user', 500);
        return allUsers;
    });
    const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.userModel.findById(id);
        if (!user) {
            throw new error_1.AppError("user is not found", 202);
        }
        return user;
    });
    const updateUserById = (id, userDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield userModel_1.userModel.findByIdAndUpdate(id, userDetails);
        return updatedUser;
    });
    const UpdateIsblock = (userid, action) => __awaiter(void 0, void 0, void 0, function* () {
        let isBlocked;
        if (action === 'block')
            isBlocked = true;
        if (action === 'unblock')
            isBlocked = false;
        const Blockeduser = yield userModel_1.userModel.findByIdAndUpdate(userid, { isBlocked }, { new: true });
        if (!Blockeduser)
            throw new error_1.AppError("something went wrong while blocking user", 500);
        return isBlocked;
    });
    const AllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield categoryModel_1.categoryModel.find();
        return categories;
    });
    const AllCourse = () => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield courseModel_1.courseModel.find();
        return courses;
    });
    const GetCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courseModel_1.courseModel.findById({ _id: id }).populate('tutor');
        return course;
    });
    const GetTutorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const tutor = yield tutorModel_1.tutorModel.findById({ _id: id });
        return tutor;
    });
    const GetcategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoryModel_1.categoryModel.findById({ _id: id });
        return category;
    });
    const GetProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const profile = yield userModel_1.userModel.findById({ _id: id });
        // console.log(profile,'user profile is inside');
        return profile;
    });
    const findBlockedUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.userModel.findOne({ email, isBlocked: true });
        if (user) {
            return true;
        }
        else {
            return false;
        }
    });
    const CheckMailverification = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = userModel_1.userModel.findOne({ email: email });
        if (user.isMailvarified == true) {
            return true;
        }
        else {
            return false;
        }
    });
    const GetCourseByTutor = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield courseModel_1.courseModel.find({ tutor: id });
        return response;
    });
    const EditProfile = (id, userDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, phone, fileUrl } = userDetails;
        const response = yield userModel_1.userModel.findByIdAndUpdate({ _id: id }, { $set: { name: name, email: email, phone: phone, image: fileUrl } });
        return response;
    });
    const CoursePurchase = (purchaseCourse) => __awaiter(void 0, void 0, void 0, function* () {
        // const {user,course,tutor,amount} = purchaseCourse
        const response = yield paymentModel_1.paymentModel.create(purchaseCourse);
        return response;
    });
    const PurchaseCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const purchasedcourse = yield paymentModel_1.paymentModel.find({ user: id }).populate('course');
        if (!purchasedcourse)
            throw new error_1.AppError('write error', 404);
        return purchasedcourse;
    });
    const CourseSearchSortFilter = (filters, sortCritirea) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(filters, 'search query is here in backend repository');
        const response = yield courseModel_1.courseModel.find({ title: { $regex: filters, $options: 'i' } }).sort(sortCritirea);
        // console.log(response,'response is here in repositories');
        return response;
    });
    const findCourseByuserandcourse = (courseid, userid) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield paymentModel_1.paymentModel.findOne({ course: courseid, user: userid });
        // console.log(response,'response here in the repository');
        return response;
    });
    const findCourseByCategory = (categoryid) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield courseModel_1.courseModel.find({ category: categoryid });
        return response;
    });
    return { findCourseByCategory, createUser, findOneUserByEmail, getAllUsers, getUserById,
        updateUserById, UpdateIsblock, AllCategory, AllCourse, GetCourseById, GetProfile,
        findBlockedUser, CheckMailverification, GetcategoryById, GetTutorById, GetCourseByTutor,
        EditProfile, CoursePurchase, PurchaseCourse, CourseSearchSortFilter, findCourseByuserandcourse };
};
exports.default = userRepositoryImp;
