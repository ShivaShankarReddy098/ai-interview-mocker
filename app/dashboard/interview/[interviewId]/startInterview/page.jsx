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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const mockId = params.interviewId;

  // Fetch interview details on component mount or when mockId changes
  useEffect(() => {
    if (mockId) {
      GetInterviewDetails();
    }
  }, [mockId]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetch(
        `https://ai-interview-mocker-azure.vercel.app/api/mockInterviews/${mockId}`
      );

      if (result.ok) {
        const mockInterview = await result.json();
        console.log("API response:", mockInterview);

        if (mockInterview && mockInterview.length > 0) {
          const interviewDetails = mockInterview[0];
          const questions = interviewDetails.jsonMockResp;

          if (Array.isArray(questions)) {
            setMockInterviewQuestion(questions);
            setInterviewData(interviewDetails);
          } else {
            console.error("Error: Invalid questions format in jsonMockResp");
            setError(true);
          }
        } else {
          console.error("Error: Interview data is empty.");
          setError(true);
        }
      } else {
        console.error("Error fetching interview. Status:", result.status);
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching mock interview:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center lg:h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-700"></div>
        <span className="ml-4 text-gray-700 text-lg">Loading Interview...</span>
      </div>
    );
  }

  // Error State
  if (error || !mockInterviewQuestion.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-red-500 font-bold text-2xl mb-4">
            Error Loading Interview Questions
          </h2>
          <p className="text-gray-700 mb-4">
            Please check your internet connection or try again later.
          </p>
          <Button onClick={GetInterviewDetails}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Render questions and interview details */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-36 gap-10">
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

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-6 mt-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
