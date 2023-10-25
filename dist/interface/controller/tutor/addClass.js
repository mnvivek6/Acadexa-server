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
exports.newClass = void 0;
const tutorModel_1 = require("../../../infra/database/model/tutorModel");
const tutorRepository_1 = __importDefault(require("../../../infra/repositories/tutor/tutorRepository"));
const addClass_1 = require("../../../app/useCase/tutor/addClass");
const db = tutorModel_1.tutorModel;
const tutorRepository = (0, tutorRepository_1.default)(db);
const newClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id, 'from create class');
        const Data = req.body.classData;
        console.log(req.body.classData, 'class datas are here');
        const classDetails = {
            title: Data.title,
            description: Data.description,
            video: Data.video
        };
        const createNewClass = yield (0, addClass_1.Addclass)(tutorRepository)(id, classDetails);
        res.status(200).json({ message: createNewClass });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.newClass = newClass;
