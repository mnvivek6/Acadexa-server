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
exports.editCategory = exports.getcategory = exports.addcategory = void 0;
const adminModel_1 = require("../../../infra/database/model/adminModel");
const adminRepository_1 = __importDefault(require("../../../infra/repositories/admin/adminRepository"));
const category_1 = require("../../../app/useCase/admin/category");
const db = adminModel_1.adminModel;
const adminRepository = (0, adminRepository_1.default)(db);
const addcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.body.CategoryData;
        console.log(category, 'before creating castegory');
        const categoryData = {
            name: category.name,
            description: category.description,
            image: category.image
        };
        console.log(categoryData);
        const createdcategory = (0, category_1.CreateCategory)(adminRepository)(categoryData);
        if (yield createdcategory) {
            res.status(200).json({ message: createdcategory });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || ' something went wrong' });
    }
});
exports.addcategory = addcategory;
const getcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Allcategory = yield (0, category_1.getCategory)(adminRepository)();
        if (Allcategory) {
            res.status(200).json({ message: Allcategory });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || ' something went wrong' });
    }
});
exports.getcategory = getcategory;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.categoryid;
        const data = req.body;
        const categorydata = {
            name: data.name,
            description: data.description,
            image: data.fileUrl
        };
        const response = yield (0, category_1.EditedCategory)(adminRepository)(id, categorydata);
        console.log(response, 'response isn here');
        console.log(categorydata, 'category datas are here');
    }
    catch (error) {
        res.status(500).json({ message: error.message || ' something went wrong' });
    }
});
exports.editCategory = editCategory;
