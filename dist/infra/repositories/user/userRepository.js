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
const userRepositoryImp = (UserModel) => {
    const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(user, 'repository');
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
    return { createUser, findOneUserByEmail, getAllUsers, getUserById, updateUserById, UpdateIsblock };
};
exports.default = userRepositoryImp;
