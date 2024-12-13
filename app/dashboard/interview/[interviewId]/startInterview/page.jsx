"use client";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const mockId = params.interviewId;

  // Fetch interview details on component mount or when mockId changes
  useEffect(() => {
    if (mockId) {
      GetInterviewDetails();
    }
  }, [mockId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await fetch(
        `http://ai-interview-mocker-azure.vercel.app/api/mockInterviews/${mockId}`
      );

      if (result.ok) {
        const mockInterview = await result.json();
        console.log("API response:", mockInterview); // Log full response

        // Ensure mockInterview contains data and check if jsonMockResp needs parsing
        if (mockInterview) {
          const response = mockInterview[0].jsonMockResp; // Don't parse if it's already an object
          console.log("Interview Questions (jsonMockResp):", response);

          setMockInterviewQuestion(response); // Set questions state
          setInterviewData(mockInterview[0]); // Set interview data (such as job position, description)
        } else {
          console.error("Interview data not found.");
        }
      } else {
        console.error("Error fetching mock interview. Status:", result.status);
      }
    } catch (error) {
      console.error("Error fetching mock interview:", error);
    }
  };

  return (
    <div>
      {/* Render questions and interview details */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-36 gap-10">
        {/* Ensure mockInterviewQuestion is passed as an array of questions */}
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
