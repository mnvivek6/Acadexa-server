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
exports.userLogin = void 0;
const userModel_1 = require("../../../infra/database/model/userModel");
const error_1 = require("../../../untils/error");
const userLogin_1 = require("../../../app/useCase/user/userLogin");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        // console.log(user);
        const { email, password } = user;
        if (!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)) {
            throw new error_1.AppError('All fields are required', 400);
        }
        const userToken = yield (0, userLogin_1.loginUser)(userRepository)(user);
        // console.log(userToken,'token is here in backend');
        res.status(200).json({ userToken });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'something went wrong' });
    }
});
exports.userLogin = userLogin;
