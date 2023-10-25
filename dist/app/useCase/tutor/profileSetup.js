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
exports.Tutorverification = exports.ViewProfile = exports.SetupProfile = void 0;
const SetupProfile = (tutorRepository) => {
    return (tutorId, tutorDetails) => __awaiter(void 0, void 0, void 0, function* () {
        const tutor = yield tutorRepository.setUpProfile(tutorId, tutorDetails);
        return tutor;
    });
};
exports.SetupProfile = SetupProfile;
const ViewProfile = (tutorRepository) => (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield tutorRepository.getProfile(tutorId);
    return tutor;
});
exports.ViewProfile = ViewProfile;
const Tutorverification = (tutorRepository) => (verificationData, tutorid) => __awaiter(void 0, void 0, void 0, function* () {
    const response = tutorRepository.TutorVerification(verificationData, tutorid);
    return response;
});
exports.Tutorverification = Tutorverification;
