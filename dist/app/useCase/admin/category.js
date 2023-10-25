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
exports.EditedCategory = exports.getCategory = exports.CreateCategory = void 0;
const CreateCategory = (adminRepository) => {
    return (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield adminRepository.Addcategory(categoryData);
        return category;
    });
};
exports.CreateCategory = CreateCategory;
const getCategory = (adminRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield adminRepository.getcategory();
    return categories;
});
exports.getCategory = getCategory;
const EditedCategory = (adminRepository) => (id, categorydata) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield adminRepository.editCategory(id, categorydata);
    return category;
});
exports.EditedCategory = EditedCategory;
