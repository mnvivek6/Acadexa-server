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
exports.Paymentdetails = void 0;
const userModel_1 = require("../../../infra/database/model/userModel");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const payment_1 = require("../../../app/useCase/user/payment");
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const Paymentdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.user._id;
        const courseid = req.body.courseid;
        const amount = req.body.Amount;
        console.log(id, courseid, amount, 'user id is here');
        const purChaseData = {
            user: req.user.user._id,
            course: req.body.courseid,
            amount: req.body.Amount,
            tutor: req.body.tutorid
        };
        const response = yield (0, payment_1.PaymentUpdate)(userRepository)(purChaseData);
        //  console.log(response,'response form backend');
    }
    catch (error) {
    }
});
exports.Paymentdetails = Paymentdetails;
