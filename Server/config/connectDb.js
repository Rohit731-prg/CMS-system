import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to db");
    } catch (error) {
        console.log(`Error from db ${error}`);
    }
}