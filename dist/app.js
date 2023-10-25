"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_errors_1 = __importDefault(require("http-errors"));
const dbConfig_1 = __importDefault(require("./infra/database/dbConfig"));
const user_1 = __importDefault(require("./interface/routes/user"));
const admin_1 = __importDefault(require("./interface/routes/admin"));
const tutor_1 = __importDefault(require("./interface/routes/tutor"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Enable CORS for all routes
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
dotenv_1.default.config();
(0, dbConfig_1.default)("mongodb+srv://mvivekmn:1234@cluster0.kb2qbes.mongodb.net/acadexa?retryWrites=true&w=majority");
//setup routes
app.use('/', user_1.default);
app.use('/admin', admin_1.default);
app.use('/tutor', tutor_1.default);
//page not found error handling
app.use((req, res, next) => {
    res.send(new http_errors_1.default.NotFound());
});
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        status: res.status || 500,
        message: error.message
    });
};
app.use(errorHandler);
const PORT = Number(process.env.PORT) || 4000;
const server = app.listen(4000, () => console.log(`server is running ${PORT}`));
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: ['http://localhost:3000', process.env.CLIENT_URL]
    }
});
io.on("connection", (socket) => {
    socket.on("setup", (userid) => {
        socket.join(userid);
        socket.emit("connected");
    });
    socket.on('join chat', (room) => {
        socket.join(room);
    });
    socket.on('new message', (newMessageReceived) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let chat = newMessageReceived === null || newMessageReceived === void 0 ? void 0 : newMessageReceived.chat;
        const sender = (newMessageReceived === null || newMessageReceived === void 0 ? void 0 : newMessageReceived.user) ? newMessageReceived === null || newMessageReceived === void 0 ? void 0 : newMessageReceived.user : newMessageReceived === null || newMessageReceived === void 0 ? void 0 : newMessageReceived.tutor;
        if ((sender === null || sender === void 0 ? void 0 : sender._id) === ((_b = (_a = newMessageReceived === null || newMessageReceived === void 0 ? void 0 : newMessageReceived.chat) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id)) {
            socket.in((_c = chat === null || chat === void 0 ? void 0 : chat.tutor) === null || _c === void 0 ? void 0 : _c._id).emit("message recieved", newMessageReceived);
        }
        if ((chat === null || chat === void 0 ? void 0 : chat._id) === ((_e = (_d = newMessageReceived === null || newMessageReceived === void 0 ? void 0 : newMessageReceived.chat) === null || _d === void 0 ? void 0 : _d.tutor) === null || _e === void 0 ? void 0 : _e._id)) {
            socket.in((_f = chat === null || chat === void 0 ? void 0 : chat.user) === null || _f === void 0 ? void 0 : _f._id).emit('message recievd', newMessageReceived);
        }
        if ((chat === null || chat === void 0 ? void 0 : chat._id) === ((_g = newMessageReceived === null || newMessageReceived === void 0 ? void 0 : newMessageReceived.user) === null || _g === void 0 ? void 0 : _g._id))
            return;
        socket.in((_h = chat === null || chat === void 0 ? void 0 : chat.user) === null || _h === void 0 ? void 0 : _h._id).emit("message recieved", newMessageReceived);
        socket.on("typing", (currentid) => socket.to(currentid).emit("typing"));
        socket.on("stoptyping", (currentid) => socket.to(currentid).emit("stoptyping"));
        if ((chat === null || chat === void 0 ? void 0 : chat._id) === ((_j = newMessageReceived === null || newMessageReceived === void 0 ? void 0 : newMessageReceived.tutor) === null || _j === void 0 ? void 0 : _j._id))
            return;
        socket.in((_k = chat === null || chat === void 0 ? void 0 : chat.tutor) === null || _k === void 0 ? void 0 : _k._id).emit('message recieved', newMessageReceived);
    });
});
