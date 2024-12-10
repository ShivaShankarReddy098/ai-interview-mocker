import { DB } from "@/lib/dbConnect";
import MockInterview from "@/models/MockInterview";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    jobPosition,
    jobDescription,
    yearsOfExperience,
    jsonMockResp,
    createdBy,
    createdAt,
  } = await request.json();
  await DB();
  console.log("005");
  console.log(
    jsonMockResp,
    jobDescription,
    jobPosition,
    yearsOfExperience,
    createdAt,
    createdBy
  );

  await MockInterview.create({
    jobPosition,
    jobDescription,
    yearsOfExperience,
    jsonMockResp,
    createdBy,
    createdAt,
  });
  return NextResponse.json(
    { message: "MockInterview Created" },
    { status: 201 }
  );
}

export async function GET() {
  await DB();
  const mockInterviews = await MockInterview.find();
  return NextResponse({ mockInterviews });
}
