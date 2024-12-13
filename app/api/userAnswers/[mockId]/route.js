import { DB } from "@/lib/dbConnect";
import UserAnswer from "@/models/UserAnswer";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { mockId } = params; // Extract `mockId` from the URL parameters

  try {
    // Connect to the database
    await DB();

    // Fetch answers where `mockId` matches, sorted by creation date
    const userAnswers = await UserAnswer.find({ mockId });

    if (!userAnswers || userAnswers.length === 0) {
      return NextResponse.json(
        { message: "User Answers not found" },
        { status: 404 }
      );
    }

    // Return the list of user answers
    return NextResponse.json(userAnswers);
  } catch (error) {
    console.error("Error fetching user answers data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
