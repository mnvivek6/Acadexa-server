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
exports.Messagetouser = exports.MessagesBychatId = exports.newMessage = void 0;
const newMessage = (messageRepository) => (userid, chatid, content) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield messageRepository.newMessage(userid, chatid, content);
    return response;
});
exports.newMessage = newMessage;
const MessagesBychatId = (messageRepository) => (chatid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chatid, "chat idddddddddddddd");
    const res = yield messageRepository.getMessegbyChatid(chatid);
    return res;
});
exports.MessagesBychatId = MessagesBychatId;
const Messagetouser = (messageRepository) => (tutorid, chatid, content) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield messageRepository.newMessgetouser(tutorid, chatid, content);
    return response;
});
exports.Messagetouser = Messagetouser;
