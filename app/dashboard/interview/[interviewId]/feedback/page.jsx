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
    // <div className="mt-20 p-10">
    //   {/* Header */}
    //   <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
    //   <h2 className="font-bold text-2xl mt-3">
    //     Here is your interview feedback
    //   </h2>

    //   {/* Loading State */}
    //   {loading && (
    //     <div className="flex justify-center items-center mt-10">
    //       <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
    //       <p className="ml-4 text-gray-700 text-lg">Loading feedback...</p>
    //     </div>
    //   )}

    //   {/* Error State */}
    //   {error && (
    //     <div className="text-center mt-10">
    //       <p className="text-red-500 text-lg font-bold">
    //         Failed to fetch feedback.
    //       </p>
    //       <p className="text-gray-600">
    //         Please check your connection or try again later.
    //       </p>
    //       <Button
    //         onClick={GetFeedback}
    //         className={`mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    //         disabled={loading}
    //       >
    //         {loading ? "Retrying..." : "Retry"}
    //       </Button>
    //     </div>
    //   )}

    //   {/* Feedback List */}
    //   {!loading && !error && (
    //     <div>
    //       <h2 className="text-blue-700 text-lg my-3">
    //         Your overall interview rating: <strong>{finalRating}/10</strong>
    //       </h2>
    //       <h2 className="text-sm text-gray-500">
    //         Below are the interview questions with correct answers, your
    //         responses, and improvement feedback:
    //       </h2>

    //       {userAnswerData.length > 0 ? (
    //         <ul className="mt-5 space-y-6">
    //           {userAnswerData.map((answer, index) => (
    //             <li
    //               key={index}
    //               className="p-4 border rounded-md shadow-lg bg-gray-50"
    //             >
    //               <p>
    //                 <strong className="text-gray-800">Question:</strong>{" "}
    //                 {answer.question}
    //               </p>
    //               <p>
    //                 <strong className="text-gray-800">Correct Answer:</strong>{" "}
    //                 {answer.correctAns}
    //               </p>
    //               <p>
    //                 <strong className="text-gray-800">Your Answer:</strong>{" "}
    //                 {answer.userAns || "No answer provided"}
    //               </p>
    //               <p>
    //                 <strong className="text-gray-800">Feedback:</strong>{" "}
    //                 {answer.feedback || "No feedback available"}
    //               </p>
    //               <p>
    //                 <strong className="text-gray-800">Rating:</strong>{" "}
    //                 {answer.rating}/10
    //               </p>
    //             </li>
    //           ))}
    //         </ul>
    //       ) : (
    //         <p className="mt-4 text-gray-600 text-center">
    //           No responses were recorded for this interview. Please retry or
    //           contact support.
    //         </p>
    //       )}
    //     </div>
    //   )}

    //   {/* Navigation Buttons */}
    //   {!loading && !error && (
    //     <div className="flex justify-end mt-10 space-x-4">
    //       <Button
    //         onClick={() => router.back()}
    //         className="bg-blue-600 hover:bg-blue-700 text-white"
    //       >
    //         Go Back
    //       </Button>
    //       <Button
    //         onClick={() => router.replace("/dashboard")}
    //         className="bg-green-600 hover:bg-green-700 text-white"
    //       >
    //         Go Home
    //       </Button>
    //     </div>
    //   )}
    // </div>
    <div className="mt-20 p-4 md:p-10 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-4">
          Congratulations!
        </h2>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Interview Feedback Summary
        </h2>
      </div>
      {loading && (
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
          <p className="text-gray-600 text-lg font-medium">
            Analyzing your responses...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center mt-10 p-6 bg-red-50 rounded-lg border border-red-200 max-w-md mx-auto">
          <p className="text-red-600 text-lg font-semibold mb-2">
            ⚠️ Feedback Retrieval Failed
          </p>
          <p className="text-gray-600 text-sm mb-4">
            We couldn't fetch your feedback. Please check your connection.
          </p>
          <Button
            onClick={GetFeedback}
            className={`bg-red-600 hover:bg-red-700 text-white transition-transform ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? "Retrying..." : "Try Again"}
          </Button>
        </div>
      )}

      {/* Feedback List */}
      {!loading && !error && (
        <div>
          <div className="bg-indigo-50 p-6 rounded-xl mb-8 shadow-sm">
            <h2 className="text-lg md:text-xl text-indigo-800 font-medium text-center">
              Overall Interview Rating:{" "}
              <span className="text-3xl font-bold text-indigo-600 ml-2">
                {finalRating}/10
              </span>
            </h2>
            <p className="text-gray-600 text-sm mt-3 text-center">
              Detailed breakdown of your performance across all interview
              questions
            </p>
          </div>

          {userAnswerData.length > 0 ? (
            <ul className="space-y-6">
              {userAnswerData.map((answer, index) => (
                <li
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
                >
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-lg font-semibold text-gray-900">
                        Question {index + 1}
                      </p>
                      <p className="text-gray-800 mt-2">{answer.question}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                          Correct Answer
                        </h3>
                        <p className="text-gray-700 bg-emerald-50 p-3 rounded-lg">
                          {answer.correctAns}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                          Your Response
                        </h3>
                        <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                          {answer.userAns || "No answer provided"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
                        Feedback
                      </h3>
                      <p className="text-gray-700 italic bg-gray-50 p-3 rounded-lg">
                        {answer.feedback || "No feedback available"}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Rating:
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {answer.rating}/10
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center p-8 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-yellow-800 font-medium">
                No interview responses recorded. Please attempt the interview
                again.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      {!loading && !error && (
        <div className="flex flex-col md:flex-row justify-end gap-4 mt-12">
          <Button
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-xl transition-all hover:scale-105 shadow-md"
          >
            ← Back to Previous
          </Button>
          <Button
            onClick={() => router.replace("/dashboard")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl transition-all hover:scale-105 shadow-md"
          >
            Dashboard →
          </Button>
        </div>
      )}
    </div>
  );
}
