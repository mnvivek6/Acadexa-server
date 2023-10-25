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
exports.Checkingpurchasedornot = exports.PurchasedCourse = exports.PaymentUpdate = void 0;
const PaymentUpdate = (userRepository) => {
    return (purchaseDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const PurchaseData = yield userRepository.CoursePurchase(purchaseDetails);
        return PurchaseData;
    });
};
exports.PaymentUpdate = PaymentUpdate;
const PurchasedCourse = (userRepository) => {
    return (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield userRepository.PurchaseCourse(id);
        if (response) {
            return response;
        }
    });
};
exports.PurchasedCourse = PurchasedCourse;
const Checkingpurchasedornot = (userRepository) => {
    return (courseid, userid) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield userRepository.findCourseByuserandcourse(courseid, userid);
        //  console.log(response,'find course by use and cosurse');
        return response;
    });
};
exports.Checkingpurchasedornot = Checkingpurchasedornot;
