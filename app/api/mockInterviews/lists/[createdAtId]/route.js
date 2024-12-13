import { DB } from "@/lib/dbConnect";
import MockInterview from "@/models/MockInterview";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { createdAtId } = params; // Get the mockId from the URL parameters

  try {
    // Connect to the database
    await DB();

    // Find the mock interview by mockId
    const mockInterview = await MockInterview.find({ createdBy: createdAtId });

    if (!mockInterview) {
      return NextResponse.json(
        { message: "Mock interview not found" },
        { status: 404 }
      );
    }

    // Return the mock interview data
    return NextResponse.json(mockInterview);
  } catch (error) {
    console.error("Error fetching mock interview data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
