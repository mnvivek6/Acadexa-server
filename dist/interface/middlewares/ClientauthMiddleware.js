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
exports.userAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const userSecretekey = process.env.USER_SECRET_KEY;
const verifyToken = (authHeader, secretekey, req, res, next) => {
    try {
        if (!authHeader || !secretekey) {
            return res.status(401).json({ success: false, message: 'Not Authenticated!', auth: false });
        }
        // Verify the JWT token
        const token = req.headers.user;
        //  console.log(token,'sdfasdfsfdsfdfasdfsfsdfsdfsfsdf');
        const splitedToken = token.split(' ')[1];
        const tokenWithoutQuotes = splitedToken.replace(/"/g, '');
        // console.log(tokenWithoutQuotes,'splited token is here');
        jsonwebtoken_1.default.verify(tokenWithoutQuotes, secretekey, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                // console.log(err);
                return res.status(403).json({ error: 'Invalid token' });
            }
            if (decode) {
                req.user = decode;
                next();
            }
        }));
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "not authenticated",
            auth: false
        });
    }
};
const userAuthToken = (req, res, next) => {
    const authHeader = req.headers.user;
    //  console.log(authHeader,'auth header from user auth side');
    verifyToken(authHeader, userSecretekey, req, res, next);
};
exports.userAuthToken = userAuthToken;
