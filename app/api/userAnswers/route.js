import { DB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UserAnswer from "@/models/UserAnswer";

export async function POST(request) {
  const {
    mockId,
    question,
    correctAns,
    userAns,
    feedback,
    rating,
    emotionalFeedback,
    dominantEmotion,
    emotionConfidence,
    userEmail,
    createdAt,
  } = await request.json();
  await DB();
  await UserAnswer.create({
    mockId,
    question,
    correctAns,
    userAns,
    feedback,
    rating,
    emotionalFeedback,
    dominantEmotion,
    emotionConfidence,
    userEmail,
    createdAt,
  });
  return NextResponse.json({ message: "UserAnswer Created" }, { status: 201 });
}
