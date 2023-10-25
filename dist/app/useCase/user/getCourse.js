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
exports.findCoursebyCategory = exports.courseByTUtor = exports.CourseById = exports.course = void 0;
const course = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.AllCourse();
});
exports.course = course;
const CourseById = (userRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.GetCourseById(id);
});
exports.CourseById = CourseById;
const courseByTUtor = (userRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.GetCourseByTutor(id);
});
exports.courseByTUtor = courseByTUtor;
const findCoursebyCategory = (userRepository) => (categoryid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findCourseByCategory(categoryid);
});
exports.findCoursebyCategory = findCoursebyCategory;
