"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Feedback({ params }) {
  const [userAnswerData, setUserAnswerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [finalRating, setFinalRating] = useState(0);
  const router = useRouter();

  const mockId = params.interviewId;

  useEffect(() => {
    if (mockId) {
      GetFeedback();
    }
  }, [mockId]);

  useEffect(() => {
    if (userAnswerData.length > 0) {
      const totalRating = userAnswerData.reduce(
        (sum, user) => sum + parseInt(user.rating),
        0
      );
      setFinalRating((totalRating / userAnswerData.length).toFixed(1)); // Round to 1 decimal
      // setFinalRating((totalRating / 10).toFixed(1));
    } else {
      setFinalRating(0);
    }
  }, [userAnswerData]);

  const GetFeedback = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetch(
        `https://ai-interview-mocker-azure.vercel.app/api/userAnswers/${mockId}`
      );

      if (result.ok) {
        const userAnswer = await result.json();
        if (Array.isArray(userAnswer) && userAnswer.length > 0) {
          setUserAnswerData(userAnswer);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 p-10">
      {/* Header */}
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl mt-3">
        Here is your interview feedback
      </h2>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-gray-700 text-lg">Loading feedback...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center mt-10">
          <p className="text-red-500 text-lg font-bold">
            Failed to fetch feedback.
          </p>
          <p className="text-gray-600">
            Please check your connection or try again later.
          </p>
          <Button
            onClick={GetFeedback}
            className={`mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Retrying..." : "Retry"}
          </Button>
        </div>
      )}

      {/* Feedback List */}
      {!loading && !error && (
        <div>
          <h2 className="text-blue-700 text-lg my-3">
            Your overall interview rating: <strong>{finalRating}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Below are the interview questions with correct answers, your
            responses, and improvement feedback:
          </h2>

          {userAnswerData.length > 0 ? (
            <ul className="mt-5 space-y-6">
              {userAnswerData.map((answer, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-md shadow-lg bg-gray-50"
                >
                  <p>
                    <strong className="text-gray-800">Question:</strong>{" "}
                    {answer.question}
                  </p>
                  <p>
                    <strong className="text-gray-800">Correct Answer:</strong>{" "}
                    {answer.correctAns}
                  </p>
                  <p>
                    <strong className="text-gray-800">Your Answer:</strong>{" "}
                    {answer.userAns || "No answer provided"}
                  </p>
                  <p>
                    <strong className="text-gray-800">Feedback:</strong>{" "}
                    {answer.feedback || "No feedback available"}
                  </p>
                  <p>
                    <strong className="text-gray-800">Rating:</strong>{" "}
                    {answer.rating}/10
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600 text-center">
              No responses were recorded for this interview. Please retry or
              contact support.
            </p>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      {!loading && !error && (
        <div className="flex justify-end mt-10 space-x-4">
          <Button
            onClick={() => router.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.replace("/dashboard")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Go Home
          </Button>
        </div>
      )}
    </div>
  );
}
