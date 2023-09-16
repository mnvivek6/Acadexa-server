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
exports.profile = void 0;
const tutorModel_1 = require("../../../infra/database/model/tutorModel");
const tutorRepository_1 = __importDefault(require("../../../infra/repositories/tutor/tutorRepository"));
const profileSetup_1 = require("../../../app/useCase/tutor/profileSetup");
const db = tutorModel_1.tutorModel;
const tutorRepository = (0, tutorRepository_1.default)(db);
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.tutor.tutor._id;
        const tutor = yield (0, profileSetup_1.ViewProfile)(tutorRepository)(tutorId);
        console.log(tutor, 'tutor profile from vei');
        res.json(tutor);
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'something went wrong' });
    }
});
exports.profile = profile;
