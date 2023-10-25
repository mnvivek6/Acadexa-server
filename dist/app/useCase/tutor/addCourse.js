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
exports.categorywiserevenue = exports.totalrevenue = exports.purchasedusers = exports.SigleCourse = exports.GetCourse = exports.AddCourse = void 0;
// import { tutorAuthToken } from "../../../interface/middlewares/authMiddleware";
const AddCourse = (tutorRepository) => {
    return (course) => __awaiter(void 0, void 0, void 0, function* () {
        return yield tutorRepository.addCourse(course);
    });
};
exports.AddCourse = AddCourse;
const GetCourse = (tutorRepositoty) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('get course');
    const courses = yield tutorRepositoty.getAllCourses(id);
    console.log(courses, 'coures from ');
    return courses;
});
exports.GetCourse = GetCourse;
const SigleCourse = (tutorRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const siglecourse = yield tutorRepository.GetSigleCourse(id);
    return siglecourse;
});
exports.SigleCourse = SigleCourse;
const purchasedusers = (tutorRepository) => (courseid) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield tutorRepository.purchasedTutors(courseid);
    return users;
});
exports.purchasedusers = purchasedusers;
const totalrevenue = (tutorRepository) => (tutorid) => __awaiter(void 0, void 0, void 0, function* () {
    const revenue = yield tutorRepository.TotalRevenue(tutorid);
    return revenue;
});
exports.totalrevenue = totalrevenue;
const categorywiserevenue = (tutorRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield tutorRepository.CategoryWiseRevenue();
    return data;
});
exports.categorywiserevenue = categorywiserevenue;
