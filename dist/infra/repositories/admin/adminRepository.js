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
const adminModel_1 = require("../../database/model/adminModel");
const adminRepositoryImp = (AdminModel) => {
    const findAdminbyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const admindetails = yield AdminModel.find();
        const admin = yield AdminModel.findOne({ email: admindetails.map((value) => value.email) });
        return admin;
    });
    const getAdminById = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield AdminModel.findById(adminId);
            if (!admin) {
                return null;
            }
            else {
                return admin;
            }
        }
        catch (error) {
            throw error;
        }
    });
    const updateProfileById = (id, adminDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield adminModel_1.adminModel.findByIdAndUpdate(id, adminDetails, { new: true });
        return admin;
    });
    return { findAdminbyEmail, getAdminById, updateProfileById };
};
exports.default = adminRepositoryImp;
