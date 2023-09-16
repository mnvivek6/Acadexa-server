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
(0, dbConfig_1.default)(process.env.MONGODB_CONNECTION_URL || '');
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
