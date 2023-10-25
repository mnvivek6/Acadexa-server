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
const messageRepositoryImp = (messageModel) => {
    const newMessage = (userid, chatid, content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messageData = {
                user: userid,
                chat: chatid,
                content: content
            };
            let Message = yield messageModel.create(messageData);
            Message = yield Message.populate('chat');
            Message = yield Message.populate('tutor');
            Message = yield Message.populate('user');
            Message = yield Message.populate('chat.tutor');
            Message = yield Message.populate('chat.user');
            return Message;
        }
        catch (error) {
        }
    });
    const getMessegbyChatid = (chatid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messages = yield messageModel.find({ chat: chatid }).populate('user').populate('tutor').populate('chat');
            return messages;
        }
        catch (error) {
            console.log(error);
        }
    });
    const newMessgetouser = (tutorid, chatid, content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messageData = {
                tutor: tutorid,
                chat: chatid,
                content: content
            };
            let Message = yield messageModel.create(messageData);
            Message = yield Message.populate('chat');
            Message = yield Message.populate('tutor');
            Message = yield Message.populate('user');
            Message = yield Message.populate('chat.tutor');
            Message = yield Message.populate('chat.user');
            return Message;
        }
        catch (error) {
        }
    });
    return { newMessage, getMessegbyChatid, newMessgetouser };
};
exports.default = messageRepositoryImp;
