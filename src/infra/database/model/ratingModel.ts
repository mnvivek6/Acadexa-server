import mongoose, { Model, Schema,Document } from "mongoose";
import { Rating } from "../../../domain/entities/Reviewandrating/rating";

export type mongoDBRating = Model<Document<any,any,any>&Rating>

 const RatingSchema = new Schema<Rating>({
    tutor:{type:mongoose.Schema.Types.ObjectId,ref:'tutor'},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    course:{type:mongoose.Schema.Types.ObjectId,ref:'course'},
    count:{type:Number}
 },{
    timestamps:{createdAt:true} // to add created_at and updated at field in schema
})

export const ratingModel:mongoDBRating = mongoose.connection.model<Document<any,any,any>&Rating>('rating',RatingSchema)