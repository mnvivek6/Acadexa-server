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
exports.Chekingpurchased = exports.purchasedcourse = exports.EditedProfile = exports.profile = void 0;
const userModel_1 = require("../../../infra/database/model/userModel");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const profile_1 = require("../../../app/useCase/user/profile");
const payment_1 = require("../../../app/useCase/user/payment");
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.user._id;
        const user = yield (0, profile_1.UserProfile)(userRepository)(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.profile = profile;
const EditedProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.user._id;
        const data = req.body;
        const userDetails = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            fileUrl: data.fileUrl
        };
        const response = yield (0, profile_1.editProfile)(userRepository)(id, userDetails);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.EditedProfile = EditedProfile;
const purchasedcourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.user._id;
        const response = yield (0, payment_1.PurchasedCourse)(userRepository)(id);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.purchasedcourse = purchasedcourse;
const Chekingpurchased = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('checking the fuunction ');
        const userid = req.user.user._id;
        // console.log(userid);
        const courseid = req.params.courseid;
        // console.log(courseid);
        const response = yield (0, payment_1.Checkingpurchasedornot)(userRepository)(courseid, userid);
        // console.log(response,'response is here');
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.Chekingpurchased = Chekingpurchased;
