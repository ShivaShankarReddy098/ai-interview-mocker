"use client";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";

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
        `http://localhost:3000/api/mockInterviews/${mockId}`
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
      <div className="grid grid-cols-1 md:grid-cols-2 mt-36">
        {/* Ensure mockInterviewQuestion is passed as an array of questions */}
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
      </div>
    </div>
  );
}
