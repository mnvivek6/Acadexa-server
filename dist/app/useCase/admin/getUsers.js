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
exports.getUserBySearch = exports.isBlockUser = exports.getUserById = exports.getUsers = void 0;
const getUsers = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.getAllUsers();
    return users;
});
exports.getUsers = getUsers;
const getUserById = (userRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.getUserById(id);
    return users;
});
exports.getUserById = getUserById;
const isBlockUser = (userRepository) => {
    return (userid, action) => __awaiter(void 0, void 0, void 0, function* () {
        const blockeduser = yield userRepository.UpdateIsblock(userid, action);
        if (blockeduser) {
            return blockeduser;
        }
        return blockeduser;
    });
};
exports.isBlockUser = isBlockUser;
const getUserBySearch = (adminRepository) => (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield adminRepository.searchUser(searchQuery);
    return response;
});
exports.getUserBySearch = getUserBySearch;
