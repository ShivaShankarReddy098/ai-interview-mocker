"use client";
import React, { useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";

export default function StartInterview() {
  //fetch mockInterview data here
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setmockInterviewQuestion] = useState();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <QuestionsSection mockInterviewQuestions={mockInterviewQuestion} />
      </div>
    </div>
  );
}
