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
exports.tutorProfile = void 0;
const tutorModel_1 = require("../../../infra/database/model/tutorModel");
const tutorRepository_1 = __importDefault(require("../../../infra/repositories/tutor/tutorRepository"));
const profileSetup_1 = require("../../../app/useCase/tutor/profileSetup");
const db = tutorModel_1.tutorModel;
const tutorRepository = (0, tutorRepository_1.default)(db);
const tutorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.tutor.tutor._id;
        console.log(tutorId);
        const data = req.body;
        console.log(data, 'here we get the data');
        const tutorData = {
            qualification: data.qualification,
            experience: data.experience,
            aboutme: data.about
        };
        const createdProfile = yield (0, profileSetup_1.SetupProfile)(tutorRepository)(tutorId, tutorData);
        if (createdProfile) {
            res.status(200).json({ Message: ' tutor Profile created successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || ' something went wrong' });
    }
});
exports.tutorProfile = tutorProfile;
