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
exports.signupUser = void 0;
const error_1 = require("../../../untils/error");
const userValidationHelper_1 = require("./userValidationHelper");
const signupUser = (userRepository) => {
    return (user) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(user,'usecase');
        const isUserExist = yield userRepository.findOneUserByEmail(user.email);
        if (isUserExist) {
            throw new error_1.AppError('User already exists', 409);
        }
        // console.log(isUserExist,'not exixt');
        const hashpassword = yield (0, userValidationHelper_1.passwordHashing)(user === null || user === void 0 ? void 0 : user.password);
        const newUser = Object.assign(Object.assign({}, user), { password: hashpassword });
        // console.log(newUser, 'new user created');
        const createdUser = yield userRepository.createUser(newUser);
        // console.log(createdUser, 'user created successfully');
        return createdUser;
    });
};
exports.signupUser = signupUser;
