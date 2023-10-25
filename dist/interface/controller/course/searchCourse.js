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
exports.SearchCourseFilterSort = void 0;
const searchCourse_1 = require("../../../app/useCase/user/searchCourse");
const userRepository_1 = __importDefault(require("../../../infra/repositories/user/userRepository"));
const userModel_1 = require("../../../infra/database/model/userModel");
const userRepository = (0, userRepository_1.default)(userModel_1.userModel);
const SearchCourseFilterSort = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sortCriteria = {};
        if (req.query.sort && req.query.sort === 'coursefee-1')
            sortCriteria = { coursefee: -1 };
        else if (req.query.sort && req.query.sort === 'coursefee1')
            sortCriteria = { coursefee: 1 };
        else if (req.query.sort && req.query.sort === 'duration-1')
            sortCriteria = { duration: -1 };
        else if (req.query.sort && req.query.sort === 'duration1')
            sortCriteria = { duration: 1 };
        else { }
        let filterData;
        // if (req.query.input) filterData =  { $regex: req.query.input, $options: 'i' } ;
        filterData = req.query.input;
        console.log(filterData);
        const response = yield (0, searchCourse_1.Searchcoursefiltersort)(userRepository)(filterData, sortCriteria);
        console.log(response, 'response from backend');
        res.status(200).json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.SearchCourseFilterSort = SearchCourseFilterSort;
