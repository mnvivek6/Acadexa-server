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
exports.signupTutor = void 0;
const error_1 = require("../../../untils/error");
const userValidationHelper_1 = require("../user/userValidationHelper");
const signupTutor = (tutorRepository) => {
    return (tutor) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(tutor, 'from tutor signup');
        console.log('hi');
        const isExist = yield tutorRepository.findTutorByEmail(tutor.email);
        console.log(isExist, 'checking tutor');
        if (isExist) {
            throw new error_1.AppError("Tutor aleardy exist", 409);
        }
        const hashedPassword = yield (0, userValidationHelper_1.passwordHashing)(tutor === null || tutor === void 0 ? void 0 : tutor.password);
        const newTutor = Object.assign(Object.assign({}, tutor), { password: hashedPassword });
        const createdTutor = yield tutorRepository.createTutor(newTutor);
        return createdTutor;
    });
};
exports.signupTutor = signupTutor;
