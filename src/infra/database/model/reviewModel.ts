import mongoose, { Model,Document, Schema } from "mongoose"
import { Review } from "../../../domain/entities/Reviewandrating/review"

export type mongoDBReview = Model<Document<any,any,any>&Review>

const ReveiwSchema = new Schema<Review>({
    course:{type:mongoose.Schema.Types.ObjectId,ref:'course'},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    content:{type:String}
},{
    timestamps:{createdAt:true} // to add created_at and updated at field in schema
})

export const reviewModel:mongoDBReview = mongoose.connection.model<Document<any,any,any>&Review>('review',ReveiwSchema)