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
exports.messagetouser = exports.AllmessageBychatid = exports.messageTotutor = void 0;
const messageRepository_1 = __importDefault(require("../../../infra/repositories/chat/messageRepository"));
const messageModel_1 = require("../../../infra/database/model/messageModel");
const messages_1 = require("../../../app/useCase/chat/messages");
const messageRepository = (0, messageRepository_1.default)(messageModel_1.messageModel);
const messageTotutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, chatid } = req.body;
        console.log(content, chatid, 'both got hrere');
        const userid = req.user.user._id;
        const response = yield (0, messages_1.newMessage)(messageRepository)(userid, chatid, content);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.messageTotutor = messageTotutor;
const AllmessageBychatid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatid = req.params.chatid;
        console.log(chatid, 'chatid is hrer');
        const response = yield (0, messages_1.MessagesBychatId)(messageRepository)(chatid);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.AllmessageBychatid = AllmessageBychatid;
const messagetouser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, chatid } = req.body;
        console.log(content, chatid);
        const tutorid = req.tutor.tutor._id;
        console.log(tutorid);
        const response = yield (0, messages_1.Messagetouser)(messageRepository)(tutorid, chatid, content);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
});
exports.messagetouser = messagetouser;
