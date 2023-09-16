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
const tutorModel_1 = require("../../database/model/tutorModel");
const tutorRepositoryImp = (TutorModel) => {
    const createTutor = (tutor) => __awaiter(void 0, void 0, void 0, function* () {
        let newTutor = yield TutorModel.create(tutor);
        return newTutor;
    });
    const findTutorByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const ExistingTutor = yield TutorModel.findOne({ email: email });
        console.log(ExistingTutor, 'find tutor by email and passing tutor');
        return ExistingTutor;
    });
    const setUpProfile = (id, tutorDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const tutor = yield tutorModel_1.tutorModel.findByIdAndUpdate(id, tutorDetails, { new: true });
        return tutor;
    });
    const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const tutor = yield tutorModel_1.tutorModel.findById({ _id: id });
        return tutor;
    });
    return { createTutor, findTutorByEmail, setUpProfile, getProfile };
};
exports.default = tutorRepositoryImp;
