import mongoose, { Model,Document, Schema } from "mongoose";
import { Payment } from "../../../domain/entities/tutor/payment";

export type mongoDBPayment = Model<Document<any,any,any>&Payment>

const PaymentSchema = new Schema<Payment>({

    amount:{type:String,required:true},
    tutor:{type:mongoose.Schema.Types.ObjectId,ref:'tutor'},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    course:{type:mongoose.Schema.Types.ObjectId,ref:'course'},
})

export const paymentModel:mongoDBPayment = mongoose.connection.model<Document<any,any,any>&Payment>('payment',PaymentSchema)