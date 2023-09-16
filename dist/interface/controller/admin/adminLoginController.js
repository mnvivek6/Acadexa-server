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
exports.adminLogin = void 0;
const adminModel_1 = require("../../../infra/database/model/adminModel");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const error_1 = require("../../../untils/error");
const adminLogin_1 = require("../../../app/useCase/admin/adminLogin");
const db = adminModel_1.adminModel;
const adminRepository = (0, adminRepository_1.default)(db);
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.body;
        console.log(admin, 'log from adminlogin');
        const { email, password } = admin;
        console.log(email, 'from before if');
        if (!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)) {
            console.log(/^\s*$/.test(email));
            throw new error_1.AppError('All fields are required', 400);
        }
        const adminToken = yield (0, adminLogin_1.loginAdmin)(adminRepository)(admin);
        console.log(adminToken, 'admin token created success fullly');
        res.status(200).json({ adminToken });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "something went wrong" });
    }
});
exports.adminLogin = adminLogin;
