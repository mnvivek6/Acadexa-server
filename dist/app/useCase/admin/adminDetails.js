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
exports.UpdateAdminProfile = exports.getAdminById = void 0;
const getAdminById = (adminRepository) => {
    return (adminId) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = adminRepository.getAdminById(adminId);
        if (!admin) {
            throw new Error("didn't get admin data");
        }
        return admin;
    });
};
exports.getAdminById = getAdminById;
const UpdateAdminProfile = (adminRepository) => {
    return (adminId, adminDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield adminRepository.updateProfileById(adminId, adminDetails);
        return admin;
    });
};
exports.UpdateAdminProfile = UpdateAdminProfile;
