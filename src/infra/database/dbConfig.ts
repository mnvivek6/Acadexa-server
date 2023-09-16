import mongoose from 'mongoose';
require('dotenv').config()
const connectDB = async (connectionUrl:string):Promise<void> => {
    try {
        await mongoose.connect(connectionUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;