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
exports.TutorTousers = exports.createChat = void 0;
const chatModel_1 = require("../../../infra/database/model/chatModel");
const chatRepository_1 = __importDefault(require("../../../infra/repositories/chat/chatRepository"));
const createChat_1 = require("../../../app/useCase/chat/createChat");
const chatRepository = (0, chatRepository_1.default)(chatModel_1.chatModel);
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.user.user._id;
        console.log(userid, 'userid is here');
        const tutorid = req.params.tutorid;
        console.log(tutorid, 'tutor id is hrere');
        if (!userid || !tutorid) {
            res.status(400).json({ message: "something went wrong" });
        }
        const response = yield (0, createChat_1.NewChat)(chatRepository)(userid, tutorid);
        console.log(response, 'response here');
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.createChat = createChat;
const TutorTousers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorid = req.tutor.tutor._id;
        console.log('tutorid:', tutorid);
        const userid = req.params.id;
        console.log('userid:', userid);
        if (!userid || !tutorid) {
            res.status(400).json({ message: "something went wrong" });
        }
        const response = yield (0, createChat_1.NewChat)(chatRepository)(userid, tutorid);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.TutorTousers = TutorTousers;
