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
exports.loginTutor = void 0;
const error_1 = require("../../../untils/error");
const tutorValidation_1 = require("./tutorValidation");
const loginTutor = (tutorRepository) => {
    return (tutor) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = tutor;
        const isTutorExist = yield tutorRepository.findTutorByEmail(email);
        console.log(isTutorExist, "userExist");
        if (!isTutorExist) {
            throw new error_1.AppError('user is not exist', 400);
        }
        const ispasswordCorrect = yield (0, tutorValidation_1.passwordCompare)(password, isTutorExist.password);
        if (!ispasswordCorrect) {
            throw new error_1.AppError('incorrect password', 401);
        }
        const tutorToken = yield (0, tutorValidation_1.createToken)(isTutorExist);
        const verifiedTutor = {
            token: tutorToken,
            status: 'loign success'
        };
        console.log(verifiedTutor, 'verified tutor');
        return verifiedTutor;
    });
};
exports.loginTutor = loginTutor;
