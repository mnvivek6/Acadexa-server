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
exports.loginAdmin = void 0;
const error_1 = require("../../../untils/error");
const adminValidation_1 = require("../admin/adminValidation");
const adminValidation_2 = require("./adminValidation");
const loginAdmin = (adminRepository) => {
    console.log('from admin login');
    return (admin) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = admin;
        console.log(email, password, 'pass word and email reaached chere');
        const isadminExist = yield adminRepository.findAdminbyEmail(email);
        if (!isadminExist) {
            throw new error_1.AppError('admin is not exist', 400);
        }
        const ispasswordCorrect = yield (0, adminValidation_2.passwordCompare)(password, isadminExist.password);
        console.log(ispasswordCorrect, 'compaared passowrd');
        const adminToken = yield (0, adminValidation_1.createToken)(isadminExist);
        const verification = {
            token: adminToken,
            status: 'login success'
        };
        return verification;
    });
};
exports.loginAdmin = loginAdmin;
