// "use server";
import mongoose from "mongoose";
// import { MongoClient } from "mongodb";
// const MONGODB_URL = process.env.NEXT_PUBLIC_MONGODB_URL;
export const DB = async () => {
  try {
    // const client = await MongoClient.connect(MONGODB_URL);
    // const db = client.db();
    // const mockInterview = db.collection("ai-interview-moker");
    // console.log(mockInterview);

    // const client = new MongoClient(MONGODB_URL, {});
    // await client.connect();
    await mongoose.connect("mongodb://localhost:27017/ai-interview-mocker");
    console.log("DB Connected...");
  } catch (err) {
    console.log("Error To DB Connect:", err);
  }
};
