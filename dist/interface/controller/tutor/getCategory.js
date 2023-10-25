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
exports.categories = void 0;
const category_1 = require("../../../app/useCase/admin/category");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const adminModel_1 = require("../../../infra/database/model/adminModel");
const adminRepository = (0, adminRepository_1.default)(adminModel_1.adminModel);
const categories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, category_1.getCategory)(adminRepository)();
        if (response) {
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || ' something went wrong' });
    }
});
exports.categories = categories;
