"use client";
import Image from "next/image";
import Webcam from "react-webcam";
import webImg from "@/public/webCam1.png";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

export default function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const userAnswerRef = useRef(""); // For capturing the final answer before sending
  const { user } = useUser();

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Process results from speech-to-text and update userAnswer
  useEffect(() => {
    console.log("Speech-to-Text Results:", results);
    if (results?.length > 0) {
      const latestResult = results[results.length - 1]?.transcript || "";
      console.log("Latest Transcript:", latestResult);

      if (latestResult.trim()) {
        setUserAnswer((prev) => {
          const updatedAnswer = `${prev.trim()} ${latestResult.trim()}`.trim();
          userAnswerRef.current = updatedAnswer; // Update the ref
          return updatedAnswer;
        });
      }
    }
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText(); // Stop recording before saving
      toast.info("Recording stopped. Processing your answer...");
    }

    // Give a slight delay to ensure state updates are processed
    setTimeout(async () => {
      const finalAnswer = userAnswerRef.current.trim();
      console.log("Final User Answer:", finalAnswer);

      if (finalAnswer.length < 10) {
        toast.error("Your answer is too short. Please record again.");
        return;
      }

      try {
        const feedbackPrompt = `
          Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}, 
          User Answer: ${finalAnswer}, 
          Depends on the question and user answer for the given interview question.
          Please provide a rating (0 to 10) and feedback in JSON format, with a 'rating' field and 'feedback' field.
        `;
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = result.response
          .text()
          .replace("```json", "")
          .replace("```", "");
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const userAnswerRes = await fetch(
          "https://ai-interview-mocker-azure.vercel.app/api/userAnswers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mockId: interviewData.mockId,
              question: mockInterviewQuestions[activeQuestionIndex]?.question,
              correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
              userAns: finalAnswer,
              feedback: JsonFeedbackResp?.feedback,
              rating: JsonFeedbackResp?.rating,
              userEmail: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format("DD-MM-YYYY"),
            }),
          }
        );

        if (userAnswerRes.ok) {
          toast.success("User Answer Saved Successfully");
          setUserAnswer(""); // Reset the userAnswer
          setResults([]); // Reset the results
          userAnswerRef.current = ""; // Reset the ref
        } else {
          toast.error("Failed to save user answer");
          console.log("Failed to save user answer");
        }
      } catch (error) {
        toast.error("Failed to save your answer. Please try again.");
        console.error(error);
      }
    }, 500); // Slight delay to ensure state is consistent
  };

  if (error) {
    return (
      <p>
        Web Speech API is not available in this browser. Please try using{" "}
        <strong>Google Chrome</strong> and ensure microphone permissions are
        enabled.
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg  relative">
        <Image
          src={webImg}
          alt="camera"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        onClick={SaveUserAnswer}
        className="my-10 flex justify-center items-center"
        variant="outline"
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-blue-700 flex gap-1 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
      <p>{userAnswer || "Your answer will appear here..."}</p>
    </div>
  );
}
