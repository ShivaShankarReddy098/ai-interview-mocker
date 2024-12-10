import React from "react";

export default function QuestionsSection({ mockInterviewQuestions }) {
  return (
    <div className="p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, index) => (
            <h2 className="p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer">
              Questions #{index + 1}
            </h2>
          ))}
      </div>
    </div>
  );
}
