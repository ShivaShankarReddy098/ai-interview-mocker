import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

export default function QuestionsSection({
  mockInterviewQuestions,
  activeQuestionIndex,
}) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry,Your browser does not support text to speech");
    }
  };
  return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestions &&
            mockInterviewQuestions.map((question, index) => (
              <h2
                key={index}
                className={`p-2 bg-secondary   rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex == index &&
                  " border-2 bg-blue-700  border-blue-700"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="mt-5 text-md md:text-lg">
          {mockInterviewQuestions[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className=" cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)
          }
        />
        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-700 my-2">
            Click on Record Answer when you want to answer thye question.At the
            end of interview we will give you the feedback along with correct
            answer for each of question and your answer to compare it.
          </h2>
        </div>
      </div>
    )
  );
}
