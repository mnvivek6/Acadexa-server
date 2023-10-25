"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CourseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    duration: { type: String, required: true },
    unlist: { type: Boolean, default: false },
    level: { type: String, enum: ['beginner', 'advanced', 'intermediate'] },
    coursefee: { type: String, required: true },
    tutor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'tutor' },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'category' },
    classes: [{
            title: { type: String },
            description: { type: String },
            video: { type: String }
        }]
}, {
    timestamps: { createdAt: true }
});
exports.courseModel = mongoose_1.default.connection.model('course', CourseSchema);
