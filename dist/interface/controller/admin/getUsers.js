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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockUser = exports.getUser = exports.getAllUsers = void 0;
const userModel_1 = require("../../../infra/database/model/userModel");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const error_1 = require("../../../untils/error");
const getUsers_1 = require("../../../app/useCase/admin/getUsers");
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('hi get all users');
        const allUsers = yield (0, getUsers_1.getUsers)(userRepository)();
        console.log(allUsers, 'got all users here');
        if (!allUsers) {
            throw new error_1.AppError("something went wrong ", 400);
        }
        res.json({ result: allUsers });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const user = yield (0, getUsers_1.getUserById)(userRepository)(id);
        res.json({ result: user });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.getUser = getUser;
const BlockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('block user');
        const { userid, action } = req.body;
        console.log(userid, action, 'req actio user id');
        if (!userid || !action)
            throw new error_1.AppError("somthing went wrong ", 500);
        const updatedUser = yield (0, getUsers_1.isBlockUser)(userRepository)(userid, action);
        console.log(updatedUser, 'updated user here');
        res.json(updatedUser);
    }
    catch (error) {
    }
});
exports.BlockUser = BlockUser;
