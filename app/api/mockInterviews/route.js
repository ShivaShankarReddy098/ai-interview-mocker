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
    mockId,
  } = await request.json();
  await DB();
  await MockInterview.create({
    jobPosition,
    jobDescription,
    yearsOfExperience,
    jsonMockResp,
    createdBy,
    createdAt,
    mockId,
  });
  return NextResponse.json(
    { message: "MockInterview Created" },
    { status: 201 }
  );
}
