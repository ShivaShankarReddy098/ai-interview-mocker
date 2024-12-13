"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Feedback({ params }) {
  const [userAnswerData, setUserAnswerData] = useState([]);
  const router = useRouter();
  const mockId = params.interviewId; // Use `mockId` here
  useEffect(() => {
    if (mockId) {
      GetFeedback();
    }
  }, [mockId]);
  const GetFeedback = async () => {
    try {
      console.log(mockId);
      const result = await fetch(
        `http://localhost:3000/api/userAnswers/${mockId}`
      );
      if (result.ok) {
        const userAnswer = await result.json();
        console.log("API Response for UserAnswer:", userAnswer);

        if (Array.isArray(userAnswer) && userAnswer.length > 0) {
          setUserAnswerData(userAnswer);
        } else {
          console.error("Error: Response is empty or not an array.");
        }
      } else {
        console.error("Error: User Answers not found");
      }
    } catch (err) {
      console.error("Error fetching user answers:", err);
    }
  };

  return (
    <div className="mt-20 p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
      <h2 className="font-bold text-2xl mt-3">
        Here is your interview feedback
      </h2>
      <h2 className="text-blue-700 text-lg my-3">
        Your overall interview rating: <strong>7/10</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find below interview question with correct answers, your answers, and
        feedback for improvement:
      </h2>
      {userAnswerData?.length > 0 ? (
        <ul className="mt-5">
          {userAnswerData.map((answer, index) => (
            <li key={index} className="mb-4">
              <p>
                <strong>Question:</strong> {answer.question}
              </p>
              <p>
                <strong>Correct Answer:</strong> {answer.correctAns}
              </p>
              <p>
                <strong>Your Answer:</strong> {answer.userAns}
              </p>
              <p>
                <strong>Feedback:</strong> {answer.feedback}
              </p>
              <p>
                <strong>Rating:</strong> {answer.rating}/10
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No answers found for this interview.</p>
      )}
      <Button onClick={() => router.replace("/dashboard")} className="mt-4">
        Go Home
      </Button>
    </div>
  );
}
