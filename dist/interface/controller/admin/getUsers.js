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
exports.SearchUserByName = exports.BlockUser = exports.getUser = exports.getAllUsers = void 0;
const userModel_1 = require("../../../infra/database/model/userModel");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const error_1 = require("../../../untils/error");
const getUsers_1 = require("../../../app/useCase/admin/getUsers");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const adminModel_1 = require("../../../infra/database/model/adminModel");
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const adminRepository = (0, adminRepository_1.default)(adminModel_1.adminModel);
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, getUsers_1.getUsers)(userRepository)();
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
        const blockeduser = yield (0, getUsers_1.isBlockUser)(userRepository)(userid, action);
        if (blockeduser === null)
            throw new error_1.AppError("something went wrong", 500);
        if (blockeduser === true) {
            res.status(200).json({ message: "user blocked successfully" });
            return;
        }
        else if (blockeduser === false) {
            res.status(200).json({ message: "user unblocked successfull" });
            return;
        }
        console.log(blockeduser, 'updated user here');
        res.json(blockeduser);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.BlockUser = BlockUser;
const SearchUserByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let searchQuery = req.query.value;
        console.log(searchQuery, 'qwertyuiop');
        const response = yield (0, getUsers_1.getUserBySearch)(adminRepository)(searchQuery);
        console.log(response, 'responses are here');
        res.status(200).json(response);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.SearchUserByName = SearchUserByName;
