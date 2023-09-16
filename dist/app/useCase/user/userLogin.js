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
exports.loginUser = void 0;
const error_1 = require("../../../untils/error");
const userValidationHelper_1 = require("./userValidationHelper");
const loginUser = (userRepository) => {
    console.log('login user useCase');
    return (user) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = user;
        const isUserExist = yield userRepository.findOneUserByEmail(email);
        console.log(isUserExist, 'is user exist ');
        if (!isUserExist) {
            throw new error_1.AppError('user is ont exist', 400);
        }
        const ispasswordCorrect = yield (0, userValidationHelper_1.passwordCompare)(password, isUserExist.password);
        if (!ispasswordCorrect) {
            throw new error_1.AppError('incorrect password', 401);
        }
        console.log(ispasswordCorrect);
        const userToken = yield (0, userValidationHelper_1.createToken)(user.email);
        const verifiedUser = {
            token: userToken,
            status: 'login success'
        };
        console.log(userToken);
        return verifiedUser;
    });
};
exports.loginUser = loginUser;
