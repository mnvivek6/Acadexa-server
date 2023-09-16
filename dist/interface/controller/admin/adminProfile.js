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
exports.UpdateProfile = void 0;
const adminModel_1 = require("../../../infra/database/model/adminModel");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const adminDetails_1 = require("../../../app/useCase/admin/adminDetails");
const db = adminModel_1.adminModel;
const adminRepository = (0, adminRepository_1.default)(db);
const UpdateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.query.Id;
        const data = req.body;
        const adminData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
        };
        const updatedProfile = yield (0, adminDetails_1.UpdateAdminProfile)(adminRepository)(adminId, adminData);
        if (updatedProfile) {
            res.status(200).json({ message: 'AdminData updated successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.UpdateProfile = UpdateProfile;
