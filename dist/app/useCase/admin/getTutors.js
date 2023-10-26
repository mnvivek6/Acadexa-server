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
exports.unverifiedtutors = exports.blockedTutor = exports.SearchTutor = exports.AllTuTors = void 0;
const AllTuTors = (tutorRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const tutors = yield tutorRepository.getAllTutors();
    return tutors;
});
exports.AllTuTors = AllTuTors;
const SearchTutor = (adminRepository) => (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminRepository.searchTutor(searchQuery);
    return result;
});
exports.SearchTutor = SearchTutor;
const blockedTutor = (adminRepository) => (tutorid, action) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminRepository.UpdateIsblocktutor(tutorid, action);
    return result;
});
exports.blockedTutor = blockedTutor;
const unverifiedtutors = (adminRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const tutors = yield adminRepository.UnverifiedTutors();
    return tutors;
});
exports.unverifiedtutors = unverifiedtutors;
