"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Feedback({ params }) {
  const [userAnswerData, setUserAnswerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [finalRating, setFinalRating] = useState();
  const router = useRouter();

  const mockId = params.interviewId;

  useEffect(() => {
    if (mockId) {
      GetFeedback();
    }
  }, [mockId]);
  useEffect(() => {
    const Rating = 0;
    userAnswerData.map((user) => (Rating += user.Rating));
    const finalRating = Rating / 10;
    // setFinalRating(Rating / 10);
    console.log(Rating);
    setFinalRating(finalRating);
  }, [userAnswerData]);

  const GetFeedback = async () => {
    setLoading(true);
    setError(false);
    try {
      console.log("Fetching feedback for mockId:", mockId);
      const result = await fetch(
        `https://ai-interview-mocker-azure.vercel.app/api/userAnswers/${mockId}`
      );

      if (result.ok) {
        const userAnswer = await result.json();
        console.log("API Response for UserAnswer:", userAnswer);

        if (Array.isArray(userAnswer) && userAnswer.length > 0) {
          setUserAnswerData(userAnswer);
        } else {
          console.error("Error: Response is empty or not an array.");
          setError(true);
        }
      } else {
        console.error("Error fetching user answers. Status:", result.status);
        setError(true);
      }
    } catch (err) {
      console.error("Error fetching user answers:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 p-10 h-screen z-10">
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
          <Button onClick={GetFeedback} className="mt-4">
            Retry
          </Button>
        </div>
      )}

      {/* Feedback List */}
      {!loading && !error && (
        <>
          <h2 className="text-blue-700 text-lg my-3">
            Your overall interview rating: <strong>{finalRating}</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Below are the interview questions with correct answers, your
            responses, and improvement feedback:
          </h2>

          {userAnswerData.length > 0 ? (
            <ul className="mt-5 space-y-6">
              {userAnswerData.map((answer, index) => (
                <li key={index} className="p-4 border rounded-md shadow-sm">
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
                    {answer.userAns}
                  </p>
                  <p>
                    <strong className="text-gray-800">Feedback:</strong>{" "}
                    {answer.feedback}
                  </p>
                  <p>
                    <strong className="text-gray-800">Rating:</strong>{" "}
                    {answer.rating}/10
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">
              No answers found for this interview.
            </p>
          )}
        </>
      )}

      {/* Go Home Button */}
      {!loading && !error && (
        <div className="flex justify-end mt-10">
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
