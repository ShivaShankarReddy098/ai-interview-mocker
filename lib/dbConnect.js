// "use server";
import mongoose from "mongoose";
// import { MongoClient } from "mongodb";
const MONGODB_URL = process.env.NEXT_PUBLIC_MONGODB_URL;
export const DB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DB Connected...");
  } catch (err) {
    console.log("Error To DB Connect:", err);
  }
};
