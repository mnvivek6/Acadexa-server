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
exports.createToken = exports.passwordCompare = exports.passwordHashing = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const passwordHashing = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    return hashedPassword;
});
exports.passwordHashing = passwordHashing;
const passwordCompare = (plainTextPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const passowrd = yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    return passowrd;
});
exports.passwordCompare = passwordCompare;
const createToken = (tutor) => {
    const secreteKey = process.env.TUTOR_SECRET_KEY;
    if (!secreteKey) {
        throw new Error('no secret key found');
    }
    const token = jsonwebtoken_1.default.sign({ tutor }, secreteKey, { expiresIn: '1day' });
    return token;
};
exports.createToken = createToken;
