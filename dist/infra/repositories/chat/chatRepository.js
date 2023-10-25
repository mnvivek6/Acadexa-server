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
const chatRepositoryImp = (chatModel) => {
    const createChat = (userid, tutorid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ischat = yield chatModel.find({ $and: [{ tutor: tutorid }, { user: userid }] });
            console.log(ischat, 'findind chat data');
            if (ischat.length > 0) {
                return ischat[0];
            }
            else {
                const chatdata = {
                    chatname: 'chat',
                    user: userid,
                    tutor: tutorid
                };
                const newchat = yield chatModel.create(chatdata);
                console.log(newchat, "created chat with user and tutor id");
                const createdChat = yield chatModel.findOne({ _id: newchat._id }).populate('user', '-password').populate('tutor', '-password');
                return createdChat;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const getAllchatByuser = (userid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chat = yield chatModel.find({ user: userid }).populate('user');
            return chat;
        }
        catch (error) {
        }
    });
    const getAllchatbyTutor = (tutorid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chats = yield chatModel.find({ tutor: tutorid }).populate('tutor');
            return chats;
        }
        catch (error) {
        }
    });
    return { createChat, getAllchatByuser, getAllchatbyTutor };
};
exports.default = chatRepositoryImp;
